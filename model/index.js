const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath)
    return JSON.parse(contactsList)
  } catch (err) {
    console.log(err.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts()
    return contacts.find(({ id }) => id.toString() === contactId)
  } catch (err) {
    console.log(err.message)
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const newContactsList = JSON.stringify(contacts.filter(
      ({ id }) => id.toString() !== contactId
    ))
    await fs.writeFile(contactsPath, newContactsList)
    return contacts.find(({ id }) => id.toString() === contactId)
  } catch (err) {
    console.log(err.message)
  }
}

const addContact = async (body) => {
  try {
    const newContact = { id: uuidv4(), ...body }
    const contacts = await listContacts()
    const newContactsArr = JSON.stringify([...contacts, newContact])
    await fs.writeFile(contactsPath, newContactsArr)
    return newContact
  } catch (err) {
    console.log(err.message)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts()
    const contactToUpdate = contacts.find(
      ({ id }) => id.toString() === contactId
    )
    const updatedContact = { ...contactToUpdate, ...body }
    const updatedContactsList = JSON.stringify(contacts.map((item) =>
      item.id.toString() === updatedContact.id.toString()
        ? updatedContact
        : item
    ))
    await fs.writeFile(
      contactsPath, updatedContactsList)

    return updatedContact
  } catch (err) {
    console.log(err.message)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
