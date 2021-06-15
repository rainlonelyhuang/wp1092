import Uploader from '../components/Uploader';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {UPLOAD_MUTATION} from '../graphql/mutations'

import "./Upload.css";


export default function Upload() {

    // TODO get the mutation function
    // pass it to the Uploader component
	const [insertPeople] = useMutation(UPLOAD_MUTATION);

    return <div id="Upload">
        <div id="PeopleUploader">
            <Uploader tag="People" mutation={insertPeople}/>
        </div>
    </div>;
}
