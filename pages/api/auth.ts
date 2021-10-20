// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface FormData {
    name: string;
    email: string;
    password: string;
    terms: boolean;
    token: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const formData: FormData = req.body;
    const errors = await validateUser(formData);
    if (errors.length > 0) {
        res.status(400).send({errors});
        return
    }
    res.status(200).send({message: 'OK'})
};

//simulates db and query to validate if user email exists
const validateUser = (formData: FormData): string[] => {
    const errors = [];
    const emails = ['user@email.com'];

    if (emails.includes(formData.email)) {
        errors.push('Email already registered');
    }
    return errors;
}
