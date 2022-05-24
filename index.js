const operations = require("./contacts.js");
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

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await operations.listContacts();
      console.table(data);
      break;

    case "get":
      const contact = await operations.getContactById(id);
      console.log("getContactById", contact);
      break;

    case "add":
      const addContactToList = await operations.addContact(name, email, phone);
      console.log(addContactToList);
      break;

    case "remove":
      const removeContactToList = await operations.removeContact(id);
      if (!removeContactToList) {
        console.log(`Contact with ID ${id} not found`);
        return;
      }
      console.log("removeContactToList", removeContactToList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
