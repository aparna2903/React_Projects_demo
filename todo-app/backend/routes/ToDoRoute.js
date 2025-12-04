const {Router} = require("express")  

const {getToDo,saveToDo, updateToDo, deleteToDo} = require("../controllers/ToDoController")

const router = Router()

// for testing purpose
// router.get('/',(req,res)=>{
//     res.json({message:"Hi there..."})
// })

router.get('/',getToDo)

router.post('/save',saveToDo)
router.post('/update',updateToDo)
router.post('/delete',deleteToDo)


module.exports = router;