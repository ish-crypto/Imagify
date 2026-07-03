import userModel from '../models/userModels.js'   // correct filename (plural)
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import transactionModel from '../models/transactionModel.js'

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Validate
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Save user 
        const userData = { 
            name,
             email,
              password: hashedPassword
             }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '')

        res.json({ success: true, token, user: { name: user.name } })

    } catch (error) {
       console.log(error);     
        res.json({ success: false, message: error instanceof Error ? error.message : String(error) })
       }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const User = await userModel.findOne({ email })
        if(!User){
            return res.json({ success: false, message: 'User not Found' })
        }
        const isMatch=await bcrypt.compare(password,User.password)
        if(isMatch){
            const token=jwt.sign({id:User._id},process.env.JWT_SECRET||'')  
        res.json({ success: true, token, user: { name: User.name } })
        }
        else{
            return res.json({ success: false, message: 'Invalid Password' })
        }
       
        

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error instanceof Error ? error.message : String(error) })
    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const userCredit = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }
        res.json({ success: true, credits: user.creditBalance ?? 0, user: { name: user.name } })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error instanceof Error ? error.message : String(error) })
    }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        const userData = await userModel.findById(userId);

        if (!userData || !planId) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        let credits, amount, id;
        switch (planId) {
            case 'Basic':
                credits = 100;
                amount = 10;
                id = 'Basic';
                break;
            case 'Advanced':
                credits = 500;
                amount = 50;
                id = 'Advanced';
                break;
            case 'Business':
                credits = 5000;
                amount = 250;
                id = 'Business';
                break;
            default:
                return res.json({ success: false, message: 'Invalid Plan' });
        }

        const transactionData = {
            userId,
            planId: id,
            amount,
            credits,
            payment: false,
            date: Date.now()
        };

        const newTransaction = new transactionModel(transactionData);
        await newTransaction.save();

        const options = {
            amount: amount * 100, // in paisa
            currency: 'INR',
            receipt: newTransaction._id.toString()
        };

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error && typeof error === 'object' && 'message' in error ? String((error).message) : String(error) });
            }
            res.json({ success: true, order });
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error instanceof Error ? error.message : String(error) });
    }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        
        if (orderInfo.status === 'paid') {
            const transactionId = orderInfo.receipt;
            const transactionData = await transactionModel.findById(transactionId);
            
            if (!transactionData) {
                return res.json({ success: false, message: 'Transaction not found' });
            }
            
            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment already verified' });
            }
            
            transactionData.payment = true;
            await transactionData.save();
            
            const userData = await userModel.findById(transactionData.userId);
            if (!userData) {
                return res.json({ success: false, message: 'User not found' });
            }
            userData.creditBalance += transactionData.credits;
            await userData.save();
            
            res.json({ success: true, message: 'Credits Added' });
        } else {
            res.json({ success: false, message: 'Payment failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error instanceof Error ? error.message : String(error) });
    }
}

export { registerUser, loginUser, userCredit, paymentRazorpay, verifyRazorpay }          