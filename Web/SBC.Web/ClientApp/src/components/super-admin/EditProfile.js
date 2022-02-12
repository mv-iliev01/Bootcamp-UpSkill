import { Link } from 'react-router-dom';
import css from './EditProfile.module.css';
import { EditAdmin,uploadImage } from './../../services/super-admin-service';

export default function EditProfile(props) {
    function OnEditAdmin(e) {
        e.preventDefault();
        console.log(e.target);

        const fd = new FormData(e.target);
        console.log(fd);
        const data = [...fd.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {});
        console.log(data);
        uploadImage(data.photoUrl).then(data=> console.log(data));

        // const _data = EditAdmin(data).then(data => { console.log(data) })
        // console.log(_data);
        
    }

    return (
        <div className={css.editContainer}>
            <div className={css.headerContainer}>
                <span className={css.text}>Personal Information</span>
                <Link to="" onClick={() => props.closeModal()} className={css.close}>X</Link>
            </div>
            <form onSubmit={e => OnEditAdmin(e)}>
                <div className={css.bodyContainer}>

                    <div className={css.bodyContainer2}>
                        <div className={css.profileImage}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="157" height="157" viewBox="0 0 157 157">
                                <path id="iconmonstr-user-5"
                                    d="M124.292,45.8A45.792,45.792,0,1,1,78.5,0,45.8,45.8,0,0,1,124.292,45.8ZM113.838,92.767a58.42,58.42,0,0,1-70.709-.013C16.492,104.483,0,141.006,0,157H157C157,141.15,139.992,104.627,113.838,92.767Z"
                                    fill="#fff" />
                            </svg>
                        </div>
                        <div className={css.fileUpload}>
                                <input name="photoUrl" type="file" className={css.upload} />
                                <span>Edit Photo</span>
                        </div>
                    </div>
                    <div className={css.bodyContainer3}>
                        <input name="fullname" className={css.nameCntr} type="text" placeholder="Aya Krasteva"></input>
                        <input name="email" className={css.nameCntr} type="text" placeholder="Hello@Motion-Software.com"></input>
                        <textarea name="profileSummary" className={css.resizableContent} type="text" placeholder="Profile Summary"></textarea>
                    </div>
                </div>
                <div className={css.footer}>
                    <button onClick={() => props.closeModal()} className={css.buttonPrs}>Cancel</button>
                    <button className={css.button} type="Submit">Save</button>
                </div>
            </form>
        </div>
    )
}