import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FormData {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

const Home: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const submitData: SubmitHandler<FormData> = async (data: FormData) => {
    console.log(data)
    setSubmitting(true)
    const res = await fetch('/api/auth')
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(submitData)}>
        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' {...register('name', { required: 'required' })} />
          {errors.name ? <div>{errors.name.message}</div> : ''}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='text' {...register('email', { required: 'required' })} />
          {errors.email ? <div>{errors.email.message}</div> : ''}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' {...register('password', {
            required: 'required', minLength: { value: 8, message: 'must be 8 characters' }, validate: (value) => {
              return (
                [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                  pattern.test(value)
                ) || "must include lower, upper, number, and special chars"
              );
            },
          })} />
          {errors.password ? <div>{errors.password.message}</div> : ''}
        </div>
        <div>
          <label htmlFor='terms'>Agree to terms</label>
          <input type='checkbox' {...register('terms', { required: 'required' })} />
          {errors.terms ? <div>{errors.terms.message}</div> : ''}
        </div>
        <button type='submit' disabled={submitting}>Register</button>
      </form>
    </div>
  )
}

export default Home
