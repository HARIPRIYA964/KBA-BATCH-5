import { Router } from "express";
import { course } from "./adminRoute.js";
import { authenticate } from "../Middleware/auth.js";

const user = Router();
const cart = new Map();


user.get('/getCourse', (req, res) => {
    try {
        const key = req.query.CourseName;
        console.log("CourseName:", key);

        const result = course.get(key);

        if (result) {
            res.status(200).json({ result });
        } else {
            res.status(404).json({ msg: 'Course not found' });
        }
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


user.get('/getCourse/:cName',authenticate, (req, res) => {
    try {
        // console.log(req.params.cName);
        const key = req.params.cName;
        console.log("CourseName:", key);

        const result = course.get(key);
        console.log(result)

        if (result) {
            res.status(200).json({ result });
        } else {
            res.status(404).json({ msg: 'Course not found' });
        }
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


user.post('/addToCart', authenticate, (req,res)=>{
    try {
        const UserName = req.name;
        console.log("Username:",UserName);
        const {CourseName} = req.body
        
        const result = course.get(CourseName)
    
        if(result){
            let userCart = cart.get(UserName);
            if (!userCart) {
                userCart = [];
            }
            console.log(userCart);

            const isCourseAlreadyInCart = userCart.some(e => 
                e.CourseName === CourseName
            );
            
            if (isCourseAlreadyInCart) {
                res.status(401).json({msg:'This course already exists in the cart'});
            } else {
                userCart.push({CourseName, Price: result.Price});
                cart.set(UserName, userCart);
                console.log("Usercart: ",userCart);
                res.status(200).json({msg:'Course added to cart successfully'});
            }
        } else{
            res.status(404).json({msg:'Course not found'})
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

user.get('/getCartDetails',authenticate, (req, res) => {
    try {
        const UserName = req.name;
        console.log("Username:",UserName);
        
        const result = cart.get(UserName);
        console.log("Cart:", result)

        if (!result) {
            res.status(404).json({msg:'Cart is empty'});
        } else {
            res.status(200).json({cart:result});
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
export default user