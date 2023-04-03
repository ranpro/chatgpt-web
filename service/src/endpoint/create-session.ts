import { currentModel } from '../chatgpt'

export default async (req, res) => {
  try {
    res.send({ status: 'Success', message: '', data: { auth: true, model: currentModel() } })
  }
  catch (error) {
    res.send({ status: 'Fail', message: error.message, data: null })
  }
}
