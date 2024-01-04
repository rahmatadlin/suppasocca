'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const forum = [
      {
        name: "Emyu Ampas",
        description: "apakah emyu tim ampas???",
        photo: "https://e0.365dm.com/23/05/2048x1152/skysports-erik-ten-hag-manchester-united_6171664.jpg?20230528194840",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chelse Ampas",
        description: "apakah chelsea terancam degradasia???",
        photo: "https://akcdn.detik.net.id/community/media/visual/2023/12/11/chelsea_169.jpeg?w=600&q=90",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Forums", forum, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Forums", null, {});

  }
};
