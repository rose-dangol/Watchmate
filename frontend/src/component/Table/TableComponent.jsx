import Table from 'react-bootstrap/Table';

function TableComponent(props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>StoryLine</th>
          <th>Is Active</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.movies && props.movies.map((item,index)=>{
          return (
            <>
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.storyline}</td>
                <td>{item.active?"Active":"Inactive"}</td>
                <td>{item.created_at}</td>
                <td>
                  <button onClick={()=>props.handleShow()}>
                    Edit
                  </button>
                </td>
              </tr>
            </>
          )
        })}
      </tbody>
    </Table>
  );
}
export default TableComponent;