import Accordion from './FormElements/Accordion';

export default function EditForm() {
  return (
    <Accordion title="User Details">
      <form>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Name" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Email" />
        </div>
      </form>
    </Accordion>
  );
}
