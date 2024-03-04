import Stripe from "stripe";
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
dotenv.config();

const stripe = new Stripe('sk_test_51Ofb7lSDYoKc4bOtFVGSUTmN5KcOn4YHyYYc6Copab8XS8FszOAMwEth80GL0YkBoBtypMxx6bFitmgHeqtHiAMB00X5L0Ofkd');

export default (dependencies: any) => {
    const stripe_controller = async (req: Request, res: Response, next: NextFunction) => {
        const {tripData , Id , payment} = req.body;
        console.log("Stripe controller");
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items:[
                    {
                        price_data:{
                            currency:'inr',
                            product_data:{
                                name:"Your trip",
                            },
                            unit_amount:parseInt(tripData.fare)*100
                        },
                        quantity:1,
                    }
                ],
                mode: "payment",
                success_url: `http://localhost:5173/review/${tripData._id}`,
                cancel_url: "http://localhost:5173/cancel",
                billing_address_collection: 'required',
                customer_email: 'customer@example.com',
            });

            console.log("Stripe session created:", session);
            res.json({ id: session.id });
        } catch (err) {
            console.error("Error caught at stripe controller =>", err);
            return err;
        }
    };

    return stripe_controller;
};
