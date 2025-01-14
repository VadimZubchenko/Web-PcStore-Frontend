import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

const PartListComponent = observer((props) => {
  const { parts } = useContext(Context)

  return (
    <div>
      <h2 className="text-center mt-4">Parts</h2>
      <div
        className="ag-theme-alpine mx-auto mb-3 card-box scrollable-table"
        style={{ height: 300, width: 600 }}
      >
        <table className="table">
          <thead className="th">
            <tr>
              <th className="text-center">ID</th>
              <th className="text-start">Part</th>
              <th className="text-start">Type</th>
              <th className="text-center">Quantity</th>
              <th className="text-start">Price</th>
              <th className="text-start">Shelf</th>
            </tr>
          </thead>
          <tbody>
            {props.list.length
              ? props.list.map((part) => (
                  <tr
                    onClick={() => parts.setSelectedPart(part)}
                    //code below while concat is true, then insert scc's "selected"
                    className={'clickable-row '.concat(
                      parts.selectedPart.partID === part.partID
                        ? 'text-bg-secondary'
                        : ''
                    )}
                    key={part.partID}
                  >
                    <td className="text-center">{part.partID}</td>
                    <td className="text-start">{part.partName}</td>
                    <td className="text-start">{part.partType}</td>
                    <td className="text-center">{part.stockQuantity}</td>
                    <td className="text-start">{part.partPrice}</td>
                    <td className="text-start">{part.shelf}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {props.errorMsg ? <div>{props.errorMsg}</div> : null}
      </div>
    </div>
  )
})

export default PartListComponent
