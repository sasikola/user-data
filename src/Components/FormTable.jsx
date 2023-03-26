import React, { useState } from "react";

function FormTable() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingIndex === null) {
      // Add new data to table
      setTableData([...tableData, formData]);
    } else {
      // Update existing data in table
      const newData = [...tableData];
      newData[editingIndex] = formData;
      setTableData(newData);
      setEditingIndex(null);
    }
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
    });
  };

  const handleDelete = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  const handleEdit = (index) => {
    const editData = tableData[index];
    setFormData(editData);
    setEditingIndex(index);
  };

  return (
    <>
      <div className="container bg-light">
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            className="form-control"
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            className="form-control"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" type="submit">
            {editingIndex !== null ? "Update" : "Submit"}
          </button>
        </form>

        <table border="2px" rules="all" cellPadding="10px">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.phoneNumber}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FormTable;
