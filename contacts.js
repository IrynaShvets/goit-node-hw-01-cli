const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const dataString = await fs.readFile(contactsPath);
  const data = JSON.parse(dataString);
  return data;
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact ? contact : null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.filter((contact) => contact.id === contactId);
  const deletedContact = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(deletedContact, null, 2));
  return contact;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
