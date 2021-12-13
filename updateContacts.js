const fs = require("fs/promises");
// const contactsPath = require("./contactsPath");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error(error.message);
  }
};

module.export = updateContacts;
