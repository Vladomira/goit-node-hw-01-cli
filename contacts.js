const { v4 } = require("uuid");
const fs = require("fs/promises");

const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((el) => el.id === contactId);
    if (!contactById) {
      return null;
    }
    return contactById;
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: v4(), ...name, ...email, ...phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); //rewrite
    return newContact;
  } catch (error) {
    // throw new Error();
    console.error(error.message);
  }
}

//
async function updateById({ id, name, phone, email }) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === id);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = { id, name, phone, email };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); //rewrite
    return contacts[idx];
  } catch (error) {
    console.error(message.error);
  }
  // const contacts = await listContacts();
  // const idx = contacts.findIndex((item) => item.id === id);
  // if (idx === -1) {
  //   return null;
  // }
  // contacts[idx] = { id, name, phone };
  // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  // return contacts[idx];
}

//
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }

    const removeContact = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removeContact;
  } catch (error) {
    console.error(message.error);
  }
  // const newContacts = contacts.filter((_, index) => index !== idx);
  // await updateContacts(newContacts);
  // return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
