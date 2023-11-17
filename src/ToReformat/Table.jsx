import PropTypes from 'prop-types';

function ShowInnerResults ({ value, label }){

    return <tr>
        <td>{value}</td>
        <td>{label}</td>
    </tr>

}

ShowInnerResults.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

function Table ({ list }) {

    return <table>
        <thead>
            <tr>
                <th>Amount</th>
                <th>Currency</th>
            </tr>
        </thead>
        <tbody>
            <ShowInnerResults value={list.value} label={list.label}/>
        </tbody>

    </table>
}

Table.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: ([
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired
        ])
    })).isRequired
};

export {ShowInnerResults, Table};