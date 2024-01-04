const axios = require("axios");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Forum, Comment } = require("../models");
const { OAuth2Client } = require("google-auth-library");
// const midtransClient = require('midtrans-client');
// const { nanoid } = require('nanoid')

class Controller {
  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      console.log(payload, "<<<<<<<<<<<");

      const [user, created] = await User.findOrCreate({
        where: {
          username: payload.email,
        },
        defaults: {
          username: payload.email,
          password: "password_google",
        },
        hooks: false,
      });

      const access_token = createToken({
        id: user.id,
        username: user.username,
      });

      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw { name: "LoginError" };
      }

      const user = await User.findOne({
        where: { username: username },
      });

      if (!user) {
        throw { name: "LoginError" };
      }

      if (!comparePassword(password, user.password)) {
        throw { name: "LoginError" };
      }

      const payload = {
        id: user.id,
        username: user.username,
      };

      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async readUser(req, res) {
    try {
      const authors = await User.findAll();

      res.status(200).json(authors);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }

  static async readDetailAuthor(req, res) {
    try {
      const { id } = req.params;
      const author = await User.findByPk(id);

      if (!author) {
        throw { name: "NotFound", id };
      }

      res.status(200).json({
        message: `Success read author with id ${author.id}`,
        author,
      });
    } catch (error) {
      console.log(error);
      let status = 500;
      let message = "Internal Server Error";

      if (error.name == "NotFound") {
        status = 404;
        message = `Data with id ${error.id} not found`;
      }

      res.status(status).json({
        message,
      });
    }
  }

  static async addUser(req, res, next) {
    try {
      const { fullname, username, password } = req.body;

      if (!username || !password) {
        throw { name: "ValidationError" };
      }

      const existingUser = await User.findOne({ where: { username } });

      if (existingUser) {
        throw new Error("Username already exists");
      }

      // Hash the password before storing it
      const hashedPassword = await hashPassword(password);

      const user = await User.create({
        fullname,
        username,
        password: hashedPassword, // Store the hashed password in the database
      });

      res.status(201).json({
        message: "Success create new user",
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readNews(req, res, next) {
    const options = {
      method: "GET",
      url: "https://football_api12.p.rapidapi.com/players/news",
      headers: {
        "X-RapidAPI-Key": "efe0432ea2msh32861135908e853p1ee93ajsn60258c52bf6b",
        "X-RapidAPI-Host": "football_api12.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.get(options.url, {
        params: options.params,
        headers: options.headers,
      });
      const newsData = response.data;

      // Process newsData as needed

      res.status(200).json(newsData); // Send the news data in the response
    } catch (error) {
      console.error(error);
      next(error); // Pass the error to the next middleware/handler
    }
  }

  // static async readBooks(req, res, next) {
  //   try {
  //     let { q } = req.query;

  //     if (!q) {
  //       q = "harry";
  //     }

  //     const { data } = await axios.get(
  //       `https://www.googleapis.com/books/v1/volumes?q=${q}`
  //     );
  //     // console.log(data);

  //     if (!data.items) throw { name: "NotFound" };

  //     const books = data.items
  //       .map((book) => {
  //         return {
  //           id: book.id,
  //           title: book.volumeInfo.title,
  //           preview: book.volumeInfo.imageLinks?.thumbnail
  //             ? book.volumeInfo.imageLinks.thumbnail
  //             : "no preview",
  //           author: book.volumeInfo.authors
  //             ? book.volumeInfo.authors[0]
  //             : "unknown",
  //           rating: book.volumeInfo.averageRating
  //             ? book.volumeInfo.averageRating
  //             : 0,
  //         };
  //       })
  //       .slice(0, 9);

  //     res.status(200).json(books);
  //   } catch (err) {
  //     console.log(err);
  //     next(err);
  //   }
  // }

  // static async readPlayers(req, res, next) {
  //   const options = {
  //     method: "GET",
  //     url: "https://api-football-v1.p.rapidapi.com/v3/players",
  //     params: {
  //       team: "33",
  //       season: "2020",
  //     },
  //     headers: {
  //       "X-RapidAPI-Key": "efe0432ea2msh32861135908e853p1ee93ajsn60258c52bf6b",
  //       "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //     },
  //   };

  //   try {
  //     const response = await axios.get(options.url, {
  //       params: options.params,
  //       headers: options.headers,
  //     });
  //     const playersData = response.data;

  //     // Process playersData as needed

  //     res.status(200).json(playersData); // Send the players data in the response
  //   } catch (error) {
  //     console.error(error);
  //     next(error); // Pass the error to the next middleware/handler
  //   }
  // }

  static async readLeagues(req, res, next) {
    try {
      const response = await axios.get(
        "https://api-football-standings.azharimm.dev/leagues/"
      );
      const data = response.data.data;

      if (!data) {
        throw { name: "NotFound" };
      }

      // Filter out unwanted leagues (Indonesia, Malaysia, Singapore, Thai, Uganda)
      const filteredLeagues = data.filter(
        (league) =>
          !["idn.1", "mys.1", "sgp.1", "tha.1", "uga.1"].includes(league.id)
      );

      // Further processing or sending the filtered data in the response
      res.status(200).json(filteredLeagues);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async readForums(req, res, next) {
    try {
      const forums = await Forum.findAll();
      res.status(200).json(forums);
    } catch (err) {
      next(err);
    }
  }

  static async addForums(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const { name, description, photo } = req.body;
      const forum = await Forum.create({
        name,
        description,
        photo,
        userId,
      });
      console.log(forum, "<<<<<<<<<");
      res.status(201).json(forum);
    } catch (err) {
      next(err);
    }
  }

  static async readDetailForum(req, res) {
    try {
      const { id } = req.params;
      const forum = await Forum.findByPk(id);

      if (!forum) {
        throw { name: "NotFound", id };
      }

      res.status(200).json(forum);
    } catch (err) {
      next(err);
    }
  }

  static async deleteForum(req, res, next) {
    try {
      const { id } = req.params;

      const forum = await Forum.findByPk(id);

      if (!forum) {
        throw { name: "NotFound", id };
      }

      await Forum.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `Success delete forum with id ${id}`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readComments(req, res, next) {
    try {
      const comments = await Comment.findAll({
        where: { forumId: req.params.id },
      });
      res.status(200).json(comments);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async addComments(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const { comment } = req.body;
      const { id: forumId } = req.params; // Assuming forumId is in the request parameters
  
      const forum = await Comment.create({
        comment,
        userId,
        forumId, // Include forumId in the creation process
      });
  
      res.status(201).json(forum);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  

  static async readLeaguesById(req, res, next) {
    try {
      const id = req.params.id;
      const response = await axios.get(
        `https://api-football-standings.azharimm.dev/leagues/${id}`
      );
      const data = response.data.data;

      if (!data) {
        throw { name: "NotFound" };
      }

      // Further processing or sending the data in the response
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async readLeaguesStandingById(req, res, next) {
    try {
      const id = req.params.id;
      const response = await axios.get(
        `https://api-football-standings.azharimm.dev/leagues/${id}/standings`
      );
      const data = response.data.data.standings;

      if (!data) {
        throw { name: "NotFound" };
      }

      // Further processing or sending the data in the response
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // static async readOrders(req, res, next) {
  //     try {
  //         const orders = await Order.findAll({
  //             where: {
  //                 userId: req.loginInfo.userId
  //             }
  //         })

  //         res.status(200).json(orders)
  //     } catch (err) {
  //         console.log(err);
  //         next(err)
  //     }
  // }

  // static async midtransToken(req, res, next) {
  //     try {
  //         // Create Snap API instance
  //         const bookPrice = 50000
  //         let snap = new midtransClient.Snap({
  //             // Set to true if you want Production Environment (accept real transaction).
  //             isProduction: false,
  //             serverKey: process.env.MIDTRANS_SERVER_KEY
  //         });

  //         const orderId = `trx-buy-${nanoid()}`

  //         await Order.create({
  //             orderId,
  //             userId: req.loginInfo.userId,
  //             amount: bookPrice
  //         })

  //         let parameter = {
  //             "transaction_details": {
  //                 "order_id": orderId,
  //                 "gross_amount": bookPrice
  //             },
  //             "credit_card": {
  //                 "secure": true
  //             },
  //             "customer_details": {
  //                 "username": req.loginInfo.username,
  //             }
  //         };

  //         const { token } = await snap.createTransaction(parameter)
  //         res.status(200).json({
  //             transaction_token: token,
  //             orderId
  //         })
  //     } catch (err) {
  //         console.log(err);
  //         next(err)
  //     }
  // }

  // static async updateOrderStatus(req, res, next) {
  //     try {
  //         const { orderId } = req.body
  //         // cari order bedasarkan order id
  //         const order = await Order.findOne({
  //             where: {
  //                 orderId
  //             }
  //         })

  //         if (!order) throw { name: "NotFound" }

  //         // abis itu check midtrans status ordernya
  //         const base64Key = Buffer.from(process.env.MIDTRANS_SERVER_KEY).toString('base64')
  //         const { data } = await axios.get(`https://api.sandbox.midtrans.com/v2/${orderId}/status`, {
  //             headers: {
  //                 Authorization: `Basic ${base64Key}`
  //             }
  //         })

  //         if (+data.status_code !== 200) {
  //             throw { name: "BadRequest" }
  //         }

  //         if (data.transaction_status !== 'capture') {
  //             throw { name: "BadRequest" }
  //         }
  //         // update order statusnya jadi paid
  //         await order.update({
  //             status: 'paid',
  //             paidDate: new Date()
  //         })

  //         res.status(200).json({
  //             message: 'Payment success!'
  //         })
  //     } catch (err) {
  //         console.log(err);
  //         next(err)
  //     }
  // }
}

module.exports = Controller;
