# Nextjs Form Validation

How to setup validation for your forms in React applications using Composition Pattern. You can see the result [here](https://next-form-validation-iota.vercel.app/)

## Features 📜
- [x]  Form Validation with zod and react-hook-form
- [x]  Global State Managment
- [x]  Composition Patter
- [x]  Steps visualization (better UX)
- [ ]  Transition (working on 💻) 

---

As a Front-end developer we all know how many times we stuck a time setting up forms to deal with different types of validation, trying to assure that everything that will be send on submit will be exactly what we are expecting. But then, the user (always the user), made the "Developer experience" grow showing that we didn't cover all the cases. And that's nice, it's because of them that we can see oportunities to grow up and learn more. The UX and de DX can't be a battle.

This project implements a initial form validation (visible and not visible), using two very cool libs and a Component Pattern that I'd used in other projects and be very satisfied with the result. So the mainly intention it's to show you a base form setup with React and I create a simple front with steps to have a simple design.

How does it works 🔍

It simulates a signature form for a Gaming Platform where you put your name, e-mail and phone, chose the plan and perks and then it shows you all the itens picked and the total price.

Let's start with the validation, take a look at the first step, containg a form for the Name, e-mail and Phone. This project use 3 libs to deal with the validation:
- react-hook-form
- @hookform/resolvers
- zod

So you can simple install them
```bash
npm i react-hook-form @hookform/resolvers zod
```

To create the Form in this project I'm using a Pattern that I'm not sure the right name but I think It's 'Composition Pattern', that basically you can create a main Component that have their compositions (in this case Input, Field, Label, etc.). But this validations does't depends on that, it's just to keep the form better mainantable.
To start, we can create the the form:

```tsx
  <Form.Field className="w-full">
    <Form.Label htmlFor="name">Name</Form.Label>
    <Form.Input type="text" name="name" />
    <Form.ErrorMessage field="name" />
  </Form.Field>
```

The important thing here is in the Input. Let's take a look:

```tsx
export default function Input({ className, ...props }: InputProps) {
  const { register } = useFormContext()

...

  return (
    <input
      id={props.name}
      className={styles}
      {...register(props.name)}
      {...props}
    />
  )
}
```

We call the 'register' method the useFormContext from 'react-hook-form' that will be responsable for register our fields in the react-hook-form . So using the spread operator syntax we can register the field and we don't need more to add the prop 'name' for the input because it will create automatically. This useFormContext and the useForm share another important function too that's the handleSubmit function (a high-order function).

After that we can create our first validation schema. I created in the root of the project a folder called 'types' and inside create a file schema.ts. Now its time to use 'Zod' to create our first schema. We will work this basic info as an object with the information that we need so lets start create our basicInfoFormSchema;

```ts
export const basicInfoFormSchema = z.object({
  name: z
    .string({ required_error: 'The field name is required' })
    .min(6, 'The name need to have at least 6 chars'),
  email: z
    .string()
    .min(1, 'The field e-mail is required')
    .email('Invalid e-mail'),
  phone: z
    .string()
    .min(1, 'The Field phone is required')
    .regex(phoneRegex, 'Invalid number'),
})
```

So as we working with an object with the properties name, email and phone we can use the zod's methods for validation theese infos, but it's not validating our form yet.

Now we can tell the react-hook-form which fields our form have so it can help us adding a type when validating these fields:
So I'll create a Type setting this form schema using the Zod Infer function:

```ts
export type BasicInfoFormData = z.infer<typeof basicInfoFormSchema>
```

Now it's finally the time for our validation. In your form we can create a instance of useForm passing the type we created, and using the resolver for validate our form. Take a look:
```ts
  const basicInfoForm = useForm<BasicInfoFormData>({ //passing the type we created to the instance
    resolver: zodResolver(basicInfoFormSchema), // using Zod resolver to validate the fields
    mode: 'all',
    defaultValues: basicInfo,
  })
```

As you can se, the useForm needs an config object that we can pass some config, but the mainly here it's the resolver. As we using zod, we need to pass the zodResolver method from the '@hook-form-resolvers' and now we can go ahead and made the two last steps to make the things work:

- As we create an instance of useForm called basicInfoForm, we can access the same methods available, and for that we will call two of them: handleSubmit and the formState (to deal with our errors).
In this case, to show you how the types are workings I created a function called handleBasicInfo. Let's take a look:

```ts
  const {
    handleSubmit,
    formState: { errors },
  } = basicInfoForm

  function handleBasicInfo(data: any) {
    if (errors.email || errors.name || errors.phone)
      return setBasicInfoFormErrors(true)

    setBasicInfoFormErrors(false)
    setBasicInfo(data)
    setCurrentStep(2)
  }
```
You can see that we can access the errors for each one of our properties because they are all setted in our useForm instance. And with the com ErrorMessage it will display the error message if some of them are not ok with the validation we made with zod.

Now, to everything works well, we need to wrapper our form with one FormProvider from 'react-hook-form'. This component will be responsable for host the context object and turns the components inside able to access the useForm methods. It will receive our all data from our useForm instance

```tsx
  <FormProvider {...basicInfoForm}>
    <form
      onSubmit={handleSubmit(handleBasicInfo)}
      className="py-4 md:py-6 overflow-hidden max-w-md">

      ...

    </form>
  </FormProvider>
```
So, we can pass the basicInfoForm to the FormProvier and our form will call the handleSubmit on submit finally. And that's is basically all you need to do to start validate a form. You can see on zod documentation another kind of validation depending on what you want to create or other kinds of Fields. In this tutorial I used on Radio and Checkbox buttons.

To navigate between the steps, I used the defaultValue passing the global state value for each one, so when you go back from a step, the data will continue the same filled before.

Some of you guys can think "Why he's using a lib for Global State Managment? It's just a simple form". Yeah, but other purpose of this project it's to show how I set my global state managment with larger applications using Zustand and because I don't like passing props and events like crazy to components, parents components and bla bla... I think even a simple code can turns a mess passing props instead share variables depending on the way you do that.

<aside>
💡 But if you guys know a better way to do that, please tell me because I want to know.

</aside>

So that's all, hope you enjoy this project and hope I can share more with you guys later.


### Tools 🛠️

🌐 [Next](https://nextjs.org/)

🌐 [Zustand](https://github.com/pmndrs/zustand)

🌐 [Tailwind](https://tailwindcss.com/)

🌐 [React Hook Form](https://react-hook-form.com/)

🌐 [Zod](https://zod.dev/)


---

## Setup 🏗️


## Getting Started

First, run the development server:

```
npm run dev
# or
yarn dev

```

Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.

## References
[Formularios Avancados no React - Canal Rocketseat](https://www.youtube.com/watch?v=XSbMSSdGSdg&t=1608s)

[Build a React Form with react-hook-form](https://www.austinshelby.com/blog/build-a-react-form-with-react-hook-form-and-zod)


## Tags:

\#validation \#form-validation \#form \#next \#next14 \#client-component \#react-hook-form

