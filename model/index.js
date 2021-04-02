const Contact = require('./shemas/contactSchema')

const listContacts = async (userId, { limit = 5, page = 1, sortBy, sortByDesc }) => {
  const { docs: contacts, totalDocs: total } = await Contact.paginate(
    { owner: userId },
    {
      limit,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      populate: {
        path: 'owner',
        select: 'email subscription -_id'
      }
    }
  )
  return { contacts, total, page: Number(page), limit: Number(limit) }
}
const getContactById = async (userId, contactId) => {
  const contactById = await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription -_id'
  })
  return contactById
}
const removeContact = async (userId, contactId) => {
  const contactToRemove = Contact.findByIdAndRemove({ _id: contactId, owner: userId })
  return contactToRemove
}

const addContact = async (body, userId) => {
  const newContact = await Contact.create({ ...body, owner: userId })
  return newContact
}

const updateContact = async (userId, body, contactId) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    body,
    { new: true }
  )
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
