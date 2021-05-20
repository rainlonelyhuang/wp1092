import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';


const router = Router();

router.post('/create-card', async function (req, res) {x
  try {
    // TODO:cle
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
router.delete('/clear', async function (req,res){
  try {
    console.log("Clearing")
    db.invoice.remove( { } );
  } 
  catch (e) {
    res.json({message: 'Something went wrong...'})

}
})
// TODO: implement the DB query
// route.xx(xxxx)

export default router;
