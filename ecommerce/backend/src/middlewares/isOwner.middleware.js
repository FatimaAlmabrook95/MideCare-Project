// const validateOwner = (req, res, next) => {
//     const entryId = req.params.entryId || req.body.entryId;
//     if (entryId === undefined) {
//       return res.status(400).send('missing entryid);
//     }
//     const userId = req.user.userId;
  
//     Database.findEntryWithId(entryId).then(entry => {
//       if (entry.ownerId === userId) {
//         next();
//       } else {
//         return res.status(403).send('Forbidden Action');
//       }
//     }).catch(() => {
//       return res.status(500).send('Internal Server Error');
//     };
//   };

const Models = require('../models')

function isOwner(model) {
    //! If validator is not exist, throw err
    if(!Models.hasOwnProperty(model))
        throw new Error(`'${validator}' model is not exist`)

    return async function(req, res, next) {
        try {
            const id = req.params.id || req.body.id;
            console.log('id',id);
            const user = req.user
            console.log('user id',user.id);
            const ModifiedModel  = await Models[model].findOne({_id:id,user:user.id})
            console.log('model',ModifiedModel);
            if (!ModifiedModel) {
                return res.status(400).send('not found');
            }
            if (ModifiedModel.user == user.id) {
                        next();
                      } else {
                        return res.status(403).send('Forbidden Action');
                      }
        } catch (err) {
            return res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = isOwner