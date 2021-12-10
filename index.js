// const fs = require("fs/promises");
// const path = require("path");

const contactsOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contactsOperations.listContacts();
      console.log(list);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact({
        name,
        email,
        phone,
      });
      console.log(newContact, "from invoke");
      break;

    case "updateById":
      const contactForUpdate = await contactsOperations.updateById({
        id,
        name,
        email,
        phone,
      });
      console.log(contactForUpdate);
      break;

    case "remove":
      const removingContact = await contactsOperations.removeContact(id);
      console.log(removingContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const id = "10";
const newContact = {
  name: "Bob Dylan",
  email: "bob@gmail.com",
  phone: "(692) 876-2979",
};

const upDateContact = {
  name: "Agata Dylan",
  email: "agata@gmail.com",
  phone: "(785) 234-9098",
};
const updateId = 6;

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "3" });
invokeAction({
  action: "add",
  ...newContact,
});

// invokeAction({
//   action: "updateById",
//   ...upDateContact,
//   id: updateId,
// });

// invokeAction({
//   action: "remove",
//   id: updateId,
// });
