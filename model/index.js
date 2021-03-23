const Contact = require('./contactSchema')

const listContacts = async () => {
  try {
    const contactsList = await Contact.find({})
    return contactsList
  } catch (err) {
    console.log(err.message)
  }
}
const getContactById = async (contactId) => {
  try {
    const contacts = await Contact.findOne({ _id: contactId })
    return contacts
  } catch (err) {
    console.log(err.message)
  }
}
const removeContact = async (contactId) => {
  try {
    const contacts = await Contact.findByIdAndRemove({ _id: contactId })
    return contacts
  } catch (err) {
    console.log(err.message)
  }
}

const addContact = async (body) => {
  try {
    const contacts = Contact.create(body)
    return contacts
  } catch (err) {
    console.log(err.message)
  }
}

const updateContact = async (body, contactId) => {
  try {
    const contacts = await Contact.findByIdAndUpdate({ _id: contactId }, { body }, { new: true })
    return contacts
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
