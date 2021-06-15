import constants from '../constants';  
import { useQuery, useMutation } from '@apollo/react-hooks';
import {STATSCOUNT_QUERY} from '../graphql/queries'
// Look at this file and see how the watchList is strucutred


export default function WatchList() {

    // TODO
    // query countStats
    // save the result in a counts variable
	const locations = constants.watchList;
	const { loading, error, data, subscribeToMore } = useQuery(STATSCOUNT_QUERY, {
		variables:{severity: 1, locationKeywords: locations}
	});
    const counts = data;

    // TODO
    // use subscription
    
    // DO NOT MODIFY BELOW THIS LINE
    return (
        <table>
        <tbody>
            <tr>
                <th>Keyword</th>
                <th>Count</th>
            </tr>
            {
                constants.watchList.map(
                    (keyword, idx) => 
                    <tr key={keyword}>
                        <td>{keyword}</td>
                        {/* You might need to see this */}
                        <td id={`count-${idx}`}>{!counts || ! counts.statsCount || counts.statsCount[idx]}</td>
                    </tr>
                )
            }
        </tbody>
        </table>
    );
}