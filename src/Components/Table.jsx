import PropTypes from 'prop-types';

function ShowInnerResults({ values }) {

    return (
        <> 
            {values.map((value, index) => <td key={index}>{value}</td>)}
        </>)

}

ShowInnerResults.propTypes = {
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string,])).isRequired
}

function Table({ list }) {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        {
                            list.label.map((element, index) => {
                                return <th key={index}> {element} </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        list && list.values.map((element, index) => {
                            return <tr key={index}>
                                <ShowInnerResults values={element} />
                            </tr> 
                        })

                    }
                </tbody>

            </table>
        </>
    )
    
}

Table.propTypes = {
    list: PropTypes.shape({
        label: PropTypes.arrayOf(PropTypes.string).isRequired,
        values: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            )
    }).isRequired
};

export { ShowInnerResults, Table };