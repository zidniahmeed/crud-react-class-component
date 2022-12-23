const Post = (props) =>{
    return (
        <div className="card">
            <div className="card-body">
                <p className="">{props.data.id}</p>
                <h3 className="card-title">{props.data.title}</h3>
                <p className="">{props.data.body}</p>
                <button onClick={()=> props.remove(props.data.id)} >delete</button>
                <button onClick={()=> props.update(props.data)} >update</button>
            </div>
        </div>
    )
}

export default Post;