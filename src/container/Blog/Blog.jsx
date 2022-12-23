import { Component } from "react";
import Post from "../../component/Post/Post";
import axios from "axios";

class Blog extends Component {
    state = {
        post: [],
        formBlogPost: {
            id : 1,
            title : '',
            body: '',
            userId: '',
        },
        isUpdate: false

    }

    getPostAPI = () => {
        axios.get('http://localhost:3004/posts?_sort=id&_order=desc') //json-server --watch db.json --port 3004
            .then((result) => {
                console.log(result.data)
                this.setState({
                    post: result.data
                })
            })
    }

    handleForm = (event) => {
        let formBlogPostNew = {...this.state.formBlogPost }
        let timestap = new Date().getTime()
        formBlogPostNew[event.target.name] = event.target.value
        if (!this.state.isUpdate) {
            formBlogPostNew['id'] = timestap
        }
        this.setState({
            formBlogPost: formBlogPostNew
        })
    }

    postData = () => {
        axios.post('http://localhost:3004/posts/', this.state.formBlogPost)
        .then((res)=>{
            console.log(res)
            this.getPostAPI()
        })
    }

    putDataToApi = () => {
        axios.put(`http://localhost:3004/posts/${this.state.formBlogPost.id}`, 
        this.state.formBlogPost)
    }


    handleSubmit =()=>{
        if (this.state.isUpdate) {
            this.putDataToApi()
        }else{
            this.postData()
        }

        alert('suksess')
    }

    handleRemove = (data) => {
        if (window.confirm('do you delete')) {
            axios.delete(`http://localhost:3004/posts/${data}`) //json-server --watch db.json --port 3004
                .then((result) => {
                    
                    this.getPostAPI()
                })
        }
    }
    handleUpdate = (data) => {
        this.setState({
            formBlogPost:data,
            isUpdate:true
        })
    }
    handleBatal = () => {
        this.setState({
            formBlogPost: {
                id : 1,
                title : '',
                body: '',
                userId: '',
            },
        })
    }

    componentDidMount() {
        this.getPostAPI()
    }



    render() {
        return (
            <>
                <div className="container mt-5 mb-5">
                    <div className="row mt-5" >
                        <div className="col-6">

                            <form>
                                <div className="" >
                                    <label className="form-label">Title</label>
                                    <input type="text" value={this.state.formBlogPost.title} className="form-control" name="title" onChange={this.handleForm} />
                                </div>
                                <div className="" >
                                    <label className="form-label">body</label>
                                    <input type="text" value={this.state.formBlogPost.body} className="form-control" name="body" onChange={this.handleForm} />
                                </div>
                                <button type="submit" className="btn btn-primary mr-5" onClick={this.handleSubmit} >Submit</button>
                                <button type="submit" className="btn btn-primary" onClick={this.handleBatal} >batal</button>
                            </form>
                        </div>
                    </div>

                    {
                        this.state.post.map(
                            post => {
                                return <Post
                                    key={post.id}
                                    data={post}
                                    remove={this.handleRemove}
                                    update={this.handleUpdate} />
                            }
                        )
                    }
                </div>
            </>
        )
    }
}

export default Blog