import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"
import styled from 'styled-components'
import { useTable, useSortBy, useRowSelect } from 'react-table'

import makeData from './makeData'

import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

// Table Style Template from React Tables
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function refreshPage() {
  window.location.reload();
}

var my_username;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds }
  } = useTable({
    columns,
    data,
  }, 
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  const handleClick = () => {
    alert('Thanks for Signing Up!');
    const JEvent = selectedFlatRows[0].original;
    const username = " " + my_username; 
    JEvent.students.push(username);
    axios.put('https://onnbvpbl5h.execute-api.us-west-2.amazonaws.com/events', JEvent);
    refreshPage()
  };


  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <p>You have selected the following Event(s): {Object.keys(selectedRowIds).length} </p>
      <pre>
          {rows.name}
         {/* <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map(
                  d => d.original
                ),
              },
              null,
              2
            )}
            </code> */}
      </pre> 
      <div className="Submit-Button">
       <h2>Click Here to Sign Up</h2>
       <button onClick={handleClick} type="button" style={{
        backgroundColor: "blue",
        marginBottom: 20

      }}>
          Submit
       </button>
      </div>
    </>
  )
}

function App({signOut, user}) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Yearbook Events [2021-2022]',
        columns: [
          {
            Header: 'ID',
            accessor: 'id',
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Date',
            accessor: 'date',
          },
          {
            Header: 'Time',
            accessor: 'begin',
          },
          {
            Header: 'Location',
            accessor: 'location',
          },
          {
            Header: 'Students',
            accessor: 'students',
          },
        ],
      },
    ],
    []
  )

  // Fetch the data from DynamoDb
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        "https://onnbvpbl5h.execute-api.us-west-2.amazonaws.com/events"
      );
      setFetchedData(data);
    };
    getData();
  }, []);

  var my_items;
  var num_items;
  my_username = user.username;

  if(fetchedData.data!=null)
  {
    my_items = fetchedData.data.Items;
    console.log(my_items);
    num_items = my_items.length;
    console.log(num_items);
  }

  const data = React.useMemo(() => makeData(my_items, num_items), [my_items, num_items]);

  return (
    <>
    <Styles>
      <h1>Hello {user.username}</h1>
      <Table columns={columns} data={data} />
      <button onClick={signOut}>Sign out</button>
    </Styles>
    </>
  )
}


export default withAuthenticator(App);
