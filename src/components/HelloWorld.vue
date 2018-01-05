<template>
  <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>Option 1</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="search"></Icon>
                        <span>Option 2</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="settings"></Icon>
                        <span>Option 3</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
                    <Dropdown style="margin-left: 88%" @on-click='doMore'>
                      <a href="javascript:void(0)">
                        下拉菜单
                        <Icon type="arrow-down-b"></Icon>
                      </a>
                      <DropdownMenu slot="list">
                          <DropdownItem name="adduser">添加用户</DropdownItem>
                      </DropdownMenu>
                       <Modal
                        title="Add new User"
                        v-model="modal1"
                        :mask-closable="false"
                        @on-ok="ok">
                         <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                          <FormItem prop="user">
                              <Input type="text" v-model="formInline.user" placeholder="Username">
                                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                              </Input>
                          </FormItem>
                          <br>
                          <FormItem prop="age">
                              <Input type="text" v-model="formInline.age" placeholder="Age">
                                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                              </Input>
                          </FormItem>
                          <br>
                          <FormItem prop="id">
                              <Input type="text" v-model="formInline.id" placeholder="Id">
                                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                              </Input>
                          </FormItem>
                          <br>
                          <!-- <FormItem>
                              <Button type="primary" @click="addUser(formInline)">Signin</Button>
                          </FormItem> -->
                      </Form>
                    </Modal>
                  </Dropdown>
                 
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <!-- <Button type="success" @click="getData()">GetUser</Button> -->
                    <Table border :columns="columns1" :data="userList" v-if="isUser"></Table>
                </Content>
                
            </Layout>
        </Layout>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapState} from 'vuex'
// import store from '@/vuex/store'
export default {
  name: 'HelloWorld',
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
  },
  data () {
    return {
      modal1:false,
      formInline: {
        user: '',
        age: '',
        id: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        age: [
          { required: true, message: 'Please fill in the age.', trigger: 'blur' },
          { type: 'string',message: 'The age length cannot be less than 20 bits', trigger: 'blur' }
        ],
        id: [
          { required: true, message: 'Please fill in the id.', trigger: 'blur' },
          { type: 'string', message: 'The id length cannot be less than 30 bits', trigger: 'blur' }
        ]
      },
      isCollapsed: false,
      isUser: false,
      columns1:[
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Id',
          key: 'id'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h,params)=>{
            return h('div',[
              h('Button',{
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    console.log(params.row.id);
                    this.$http.delete('api/user/deleteUser?id='+params.row.id).then((res)=>{
                      console.log(res);
                      // this.userList.splice(item,1);
                      if(res.statusText == 'OK'){
                        this.getData();
                      }
                    })
                  }
                }
              },'Delete')
            ])
          }
        }
      ],
      userList: [],
      userName: '',
      userId:'',
      age: '',
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    },
    doMore:function(name){
      console.log(name);
      if(name == 'adduser'){
        this.modal1 = true;
      }
    },
    getData(){
      this.isUser = true;
      this.$http.get('/api/user/getALL').then((response)=>{
        this.userList = response.data;
        console.log(response.data);
      })
    },
    ok(){
      var datas = this.$refs.formInline.model;
      console.log(this.$refs.formInline.model);
      var name = datas.user;
      var age = parseInt(datas.age);
      var userId = parseInt(datas.id);
      this.$http.post('/api/user/addUser',{
        id: userId,
        username: name,
        age: age
      }).then((response)=>{
        console.log(response);
        if(response.body.protocol41 == true){
          this.getData();
        }
        console.log(response);
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
