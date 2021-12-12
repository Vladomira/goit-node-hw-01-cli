const { v4 } = require("uuid");
const fs = require("fs/promises");

const contactsPath = require("./contactsPath");
const updateContacts = require("./updateContacts");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  console.log(contacts);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((el) => el.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function addContact(data) {
  // const data = await fs.readFile(contactsPath, "utf-8");
  // const contacts = JSON.parse(data).concat(newContact);
  const newContact = { id: v4(), ...data };
  const contacts = await listContacts();
  contacts.push(newContact);
  // const data = JSON.stringify(contacts);
  // console.log("data", data);

  // await updateContacts(contacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8"); //rewrite
  return newContact;
}

//
async function updateById({ id, name, phone }) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, name, phone };
  await updateContacts(contacts);
  return contacts[idx];
}

//
async function removeContact(contactId) {
  console.log(contactId, "contactId");
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  console.log(idx, "idx");
  // const newContacts = contacts.filter((_, index) => index !== idx);
  // await updateContacts(newContacts);
  // return contacts[idx];

  ////
  // const removeContact = contacts.splice(idx, 1);
  // await updateContacts(contacts);
  // return removeContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
