// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
// const { require } = require("yargs")
// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const contactsOperations = require("./contacts");
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contactsOperations.listContacts();
      console.table(list);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      console.table(contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact({
        name,
        email,
        phone,
      });
      console.table(newContact);
      break;

    case "updateById":
      const contactForUpdate = await contactsOperations.updateById({
        id,
        name,
        email,
        phone,
      });
      console.table(contactForUpdate);
      break;

    case "remove":
      const removingContact = await contactsOperations.removeContact(id);
      console.table(removingContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
