import { useState } from "react"
import { useForm } from "react-hook-form"
import { Item } from "./Item.jsx"

export const Meal = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [ itemCount, setItemCount ] = useState(1);
  const [ submitSuccess, setSubmitSuccess ] = useState(false);
  const [ submitError, setSubmitError ] = useState(null);

  const handleItemCountChange = (e, operation) => {
    e.preventDefault()
    switch (operation) {
      case 'add':
        setItemCount(itemCount+1)
        break
      case 'remove':
        if (itemCount > 1) {
          setItemCount(itemCount-1)
        }
        break
      default:
        break
    }
  }

  const handleResetForm = () => {
    setItemCount(1);
    setSubmitSuccess(false);
    setSubmitError(null);
    reset();
  }

  const onSubmit = (data) => {
    const request = reformatData(data);
    fetch('http://localhost:3001/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Username': 'testuser', // Replace with actual username
      },
      body: JSON.stringify(request),
    })
    .then(response => {
      if (!response.ok) {
        setSubmitError('Failed to submit meal data');
        return;
      }
      setSubmitSuccess(true);
      return response.json();
    })
  }

  const reformatData = (data) => {
    const items = [];
    for (let i = 0; i < itemCount; i++) {
      items.push({
        name: data[`name-${i}`],
        notes: data[`notes-${i}`],
        dairy: data[`dairy-${i}`] || false,
        redMeat: data[`redMeat-${i}`] || false,
        gluten: data[`gluten-${i}`] || false,
        caffeine: data[`caffeine-${i}`] || false,
        alcohol: data[`alcohol-${i}`] || false,
      });
    }
    return { items, atHome: data.at_home };
  }

  if (submitError) {
    return <div>Error: {submitError}</div>;
  }

  if (submitSuccess) {
    return (
      <div>
        <div>Meal submitted successfully!</div>
        <button onClick={handleResetForm}>Reset Form</button>
      </div>
    );
  }
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Array.from({ length: itemCount }, (_, index) => (
            <Item index={index} register={register} errors={errors} />
        ))}

        <div>
          <label htmlFor="atHome">At Home</label>
          <input type="checkbox" id="atHome" {...register("at_home")} />
        </div>

        <button onClick={e => handleItemCountChange(e, 'add')}>Add Item</button>
        <button onClick={e => handleItemCountChange(e, 'remove')}>Remove Item</button>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

    </>
  )
}