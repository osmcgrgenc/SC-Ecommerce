export default function AddForm() {
    return (
      <form>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Enter name" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Enter email" />
        </div>
        <button type="submit">Add User</button>
      </form>
    );
  }
  