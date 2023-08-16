
const create = async (req, res) => {
  try {
    let url = req.imageUrl
    res.status(201).json({
        url
    })
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: 'somthing wrong'
    })
  }
}



module.exports = {
  create,
}