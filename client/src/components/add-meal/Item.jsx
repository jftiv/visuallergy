export const Item = ({index, register, errors}) => {
  return (
    <>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...register(`name-${index}`, { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="notes">Notes</label>
          <input id="notes" {...register(`notes-${index}`)} />
        </div>

        <div>
          <label htmlFor="dairy">Dairy</label>
          <input type="checkbox" id="dairy" {...register(`dairy-${index}`)} />
        </div>

        <div>
          <label htmlFor="redMeat">Red Meat</label>
          <input type="checkbox" id="redMeat" {...register(`redMeat-${index}`)} />
        </div>

        <div>
          <label htmlFor="gluten">Gluten</label>
          <input type="checkbox" id="gluten" {...register(`gluten-${index}`)} />
        </div>

        <div>
          <label htmlFor="caffeine">Caffeine</label>
          <input type="checkbox" id="caffeine" {...register(`caffeine-${index}`)} />
        </div>

        <div>
          <label htmlFor="alcohol">Alcohol</label>
          <input type="checkbox" id="alcohol" {...register(`alcohol-${index}`)} />
        </div>
    </>
  );
}