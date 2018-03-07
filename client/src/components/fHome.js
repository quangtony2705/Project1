import React, { Component } from 'react';
import '../../public/css/style.css'
import axios from 'axios';
import Menu from './Menu'
var Url = window.config.API_URL;
//import Pagination from "./Pagination";
//import { Table } from 'react-bootstrap';

class Home extends Component {
    state = {
        user: [],
        name: '',
        items: [],
        id: '',
        room: '',
        roomedit: '',
        key: '',
        itemsCamera: [],
        camera: '',
        ftp: '',
        rtsp: '',
        cameraedit: '',
        ftpedit: '',
        rtspedit: '',
        roomid: '',
        roomname: '',
        roomcamera: '',
        dates: [],
        day: '',
        dayid: '',
        menu: [],
        itemofpage: [],
        activePage: 1,
        itemsCountPerPage: 4,
        sliceItems: [],
        pageNumber: 1,
        listDel: [],
        listDelCam: []
    }

    componentWillMount() {
        if (localStorage.user === undefined) {
            window.location.href = '/login';
        }
        var list = ['Ops Team', 'Sale/Advertiser', 'Call Center', 'Shipper']
        this.setState({
            user: list
        })
    }
    componentDidMount() {
        this.loadRoom()
        this.loadCamera()
        this.countDate()
        this.loadMenu()
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    clearText(e) {
        this.setState({
            roomedit: '',
            cameraedit: '',
            ftpedit: '',
            rtspedit: ''
        })
    }
    //room
    createUser(event) {
        var list = this.state.user;
        if (this.state.name.length === 0) {
            alert('Khong duoc bo trong')
        } else {
            list.push(this.state.name);
        }
        this.setState({
            user: list
        });
        // let that = this
        // if (this.state.room.length === 0) {
        //     alert('Khong duoc bo trong')
        // }
        // else {
        //     axios.get(Url + 'roomExist', {
        //         params: {
        //             room: this.state.room
        //         }
        //     }).then(function (response) {
        //         if (response.data === 1) {
        //             alert('Ten phong da ton tai')
        //         } else {
        //             var payload = {
        //                 "room": that.state.room,
        //             }
        //             axios.post(Url + 'insertRoom', payload).then(function (response) {
        //                 that.setState({ items: [] })
        //                 that.loadRoom();
        //             }).catch(function (error) {
        //                 console.log(error);
        //             });
        //         }
        //     })
        // }
    }
    loadRoom() {
        let that = this
        axios.get(Url + 'loadRoom').then(function (response) {

            that.setState({
                items: response.data
            });
            that.handlePageChange(that.state.pageNumber);

        })
    }
    delRoom(_id) {
        let that = this
        axios.delete(Url + 'delRoom', {
            params: {
                id: _id
            }
        }).then(function (response) {
            that.setState({ items: [] })
            that.loadRoom();
        })
        axios.delete(Url + 'delRoomCamera', {
            params: {
                id: _id
            }
        }).then(function (response) {
            that.loadMenu()
            that.loadCamera()
            that.loadRoom()
        })
    }
    confirmDel(key) {
        var retVal = confirm("Do you want to continue ?");
        if (retVal === true) {
            this.delRoom(key)
            return true;
        }
        else {
            return false;
        }
    }
    confirmMutilDel(list) {
        var retVal = confirm("Do you want to continue ?");
        if (retVal === true) {
            //console.log(list.length);
            for (var i = 0; i < list.length; i++) {
                this.delRoom(list[i]);
                //console.log(list[i]);
            }
            var bt = document.getElementsByName('all');
            bt[0].checked = false;
            return true;
        }
        else {
            return false;
        }

    }
    loadRoomById(_id) {
        let that = this
        axios.get(Url + 'loadRoomById', {
            params: {
                id: _id
            }
        }).then(function (response) {
            that.setState({
                roomedit: response.data[0].name,
                key: response.data[0]._id
            })
        })
    }
    updateRoom(e) {
        let that = this
        var payload = {
            "name": this.state.roomedit,
            "id": this.state.key
        }
        axios.put(Url + 'updateRoom', payload).then(function (response) {
            that.setState({ items: [] })
            that.loadRoom()
            that.loadMenu()
        })
        var payload1 = {
            "id": this.state.key,
            "nameroom": this.state.roomedit
        }
        axios.put(Url + 'updateRoomCamera', payload1).then(function (response) {
            that.loadCamera();
        })
    }
    //camera
    onChangeCmb = (e) => {
        // console.log(e.target.value);
        var value = this.state.items.filter(function (item) {
            return item._id === e.target.value
        })
        // console.log(value[0].name);
        // console.log(value[0]._id);
        this.setState({
            roomid: value[0]._id,
            roomname: value[0].name,
            [e.target.name]: e.target.value
        })
    }

    checklink(link) {
        var arr = link.split('.mp4');
        if (arr.length === 2) {
            return 1;
        } else {
            return 0;
        }
    }
    createCamera(event) {
        if (this.state.roomcamera.length < 1 || this.state.roomcamera === '------') {
            alert('Hay chon room')
        }
        else {
            let that = this
            var payload = {
                "camera": this.state.camera,
                "ftp": this.state.ftp,
                "rtsp": this.state.rtsp,
                "roomid": this.state.roomid,
                "roomname": this.state.roomname
            }
            if (this.state.camera.length === 0) {
                alert('Khong duoc bo trong camera')
            } else if (this.state.ftp.length === 0 || this.checklink(this.state.ftp) === 0) {
                alert('Khong duoc bo trong ftp hoac khong dung file')
            }
            else if (this.state.rtsp.length === 0) {
                alert('Khong duoc bo trong rtsp')
            }
            else {
                axios.get(Url + 'cameraExist', {
                    params: {
                        camera: this.state.camera,
                        roomname: this.state.roomname
                    }
                }).then(function (response) {
                    if (response.data === 1) {
                        alert('Ten phong da ton tai')
                    } else {
                        axios.post(Url + 'insertCamera', payload).then(function (response) {
                            that.setState({ itemsCamera: [] })
                            that.loadCamera()
                            that.loadMenu()
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                })
            }

        }
    }
    loadCamera() {
        let that = this
        axios.get(Url + 'loadCamera').then(function (response) {
            that.setState({
                itemsCamera: response.data
            });
        })
    }

    delCamera(_id) {
        let that = this
        axios.delete(Url + 'delCamera', {
            params: {
                id: _id
            }
        }).then(function (response) {
            that.setState({ itemsCamera: [] })
            that.loadCamera();
            that.loadMenu()
        })
    }
    confirmDelCamera(key) {
        var retVal = confirm("Do you want to continue ?");
        if (retVal === true) {
            this.delCamera(key)
            return true;
        }
        else {
            return false;
        }
    }
    confirmMutilDelCamera(list) {
        var retVal = confirm("Do you want to continue ?");
        if (retVal === true) {
            //console.log(list.length);
            for (var i = 0; i < list.length; i++) {
                this.delCamera(list[i]);
                //console.log(list[i]);
            }
            var bt = document.getElementsByName('allCam');
            bt[0].checked = false;
            return true;
        }
        else {
            return false;
        }

    }
    loadCameraById(_id) {
        let that = this
        axios.get(Url + 'loadCameraById', {
            params: {
                id: _id
            }
        }).then(function (response) {
            that.setState({
                cameraedit: response.data[0].name,
                ftpedit: response.data[0].ftp,
                rtspedit: response.data[0].rtsp,
                key: response.data[0]._id
            })
        })
    }
    updateCamera(e) {
        let that = this
        var payload = {
            "name": this.state.cameraedit,
            "ftp": this.state.ftpedit,
            "rtsp": this.state.rtspedit,
            "id": this.state.key
        }
        axios.put(Url + 'updateCamera', payload).then(function (response) {
            that.setState({ itemsCamera: [] })
            that.loadCamera();
            that.loadMenu()
        })
    }
    //play back
    countDate() {
        var today = new Date()
        var day = today.getDate()
        for (let i = day; i >= 1; i--) {
            const newItem = {
                day: i + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
                dayid: i
            };
            this.setState(prevState => ({
                dates: prevState.dates.concat(newItem),
            }));
        }
    }
    countCamera = (e, _date) => {
        e.preventDefault();
        axios.get(Url + 'countCamera', {
            params: {
                date: _date
            }
        }).then(function (response) {
            console.log(response)
        })
    }
    //menu
    loadMenu() {
        let that = this
        axios.get(Url + 'menu').then(function (response) {
            that.setState({
                menu: response.data
            })
        })
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: (pageNumber) });
        var firstItem = (pageNumber - 1) * this.state.itemsCountPerPage;
        var lastItem = firstItem + this.state.itemsCountPerPage;
        var slice = this.state.items.slice(firstItem, lastItem);
        this.setState({
            sliceItems: slice,
            pageNumber: pageNumber
        })
        if (this.state.sliceItems.length < 1) {
            firstItem = (pageNumber - 2) * this.state.itemsCountPerPage;
            lastItem = firstItem + this.state.itemsCountPerPage;
            slice = this.state.items.slice(firstItem, lastItem);
            this.setState({
                sliceItems: slice,
                pageNumber: pageNumber
            })
            this.setState({ activePage: (pageNumber - 1) });
        }
    }

    checkall(e) {
        var checkboxes = document.getElementsByName('check');
        //var all = document.getElementsByName('all');
        //console.log(e.target.checked);
        //this.state.listDel = null;
        var list = this.state.listDel;
        if (e.target.checked) {
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
                list.push(checkboxes[i].value);
            }
            this.setState({
                listDel: list
            });

        } else {
            for (i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
                list = [];
            }
            this.setState({
                listDel: list
            });
        }
    }
    checkbox(e) {
        var list = this.state.listDel;
        if (e.target.checked) {
            list.push(e.target.value);
        } else {
            list.pop(e.target.value);
        }
        if (list.length < this.state.sliceItems.length) {
            var btR = document.getElementsByName('all');
            btR[0].checked = false;
            console.log(list);
        } else if (list.length === this.state.sliceItems.length) {
            btR = document.getElementsByName('all');
            btR[0].checked = true;
            console.log(list + 'dd');
        }

    }
    checkallCam(e) {
        var checkboxes = document.getElementsByName('checkCam');
        //this.state.listDelCam = null;
        var list = this.state.listDelCam;
        if (e.target.checked) {
            for (var i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true;
                list.push(checkboxes[i].value);
            }
            this.setState({
                listDelCam: list
            });

        } else {
            for (i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
                list = [];
            }
            this.setState({
                listDelCam: list
            });
        }

    }
    checkboxCam(e) {
        var list = this.state.listDelCam;
        if (e.target.checked) {
            list.push(e.target.value);
        } else {
            list.pop(e.target.value);
        }
        if (list.length < 1) {
            var bt = document.getElementsByName('allCam');
            bt[0].checked = false;
        }
        console.log(list);
    }

    handlerclick(ten) {
        var Name = ten;
        var Datetime = document.getElementById('Date').value;
        alert(Name +' '+Datetime)
    }

    render() {
        return (
            <div id="wrapper">
                <Menu/>
                <div id="page-wrapper">
                    <div className='btt-Right'>
                        <a href="/user" className='btt-info link-back'><i className="fa fa-edit fa-fw"></i> User</a>
                        <a href="/userGroup" className='btt-info link-back'><i className="fa fa-edit fa-fw"></i> User Group</a>
                    </div>
                    <div className='info-group'>
                        <fieldset>
                            <legend>Infomation:</legend>
                            <input className='txt-info' type='text' name='txtName' placeholder='Name' />
                            <input className='txt-info' type='text' name='txtDate' placeholder='Date' />
                            <input className='txt-info txt-add' type='text' name='address' placeholder='Address' />
                            <div className='btt-group'>
                                <button className='btt-info'>Delete
                            </button>
                                <button className='btt-info'>Edit
                            </button>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <legend>User List:</legend>
                            <div>
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Date</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.user.map(item => {
                                                return (
                                                    <tr key={item} onClick={this.handlerclick.bind(item)}>
                                                        <td id='name'>{item}</td>
                                                        <td id='Date'>1515570144024</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

        )
    }
}
export default Home
