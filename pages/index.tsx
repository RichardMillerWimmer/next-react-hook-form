import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useForm } from 'react-hook-form'

interface FormData {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

const Home: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();



  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit((formData) => {
        console.log(formData)
      })}>
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
          <input type='text' {...register('password', {
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
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Home
