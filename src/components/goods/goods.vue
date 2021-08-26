<template>
  <div>
    <div id="table">
      shangpingliebiao
      <div id="table">
        <input type="text" placeholder="inputyourtitle" />
        <input type="text" aria-placeholder="inputyourname" />
        <input type="data" placeholder="time" />
        <button>add</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>role_name</th>
            <th>time</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in goodsList" :key="index">
            <th><input type="checkbox" /></th>
            <th>{{ item.productId }}</th>
            <th>{{ item.productName }}</th>
            <th>{{ item.productPrice }}</th>
            <th>{{ item.productQuentity }}</th>
            <th>
              <span><button>查询</button></span>
              <span><button>删除</button></span>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 网例子 -->
    <div class="tb-table-list">
      <div><button @click="addnew">新增数据</button></div>

      <table class="tb-table2" cellspacing="0" cellpadding="0">
        <!-- 表头 -->
        <thead>
          <tr>
            <th width="60" v-if="datas.length > 0">
              <div class="cell">
                <input
                  @change="checkedAll"
                  v-model="checkAllBox"
                  type="checkbox"
                />
              </div>
            </th>
            <th width="200"><div class="cell">index</div></th>

            <th width="200"><div class="cell">id</div></th>

            <th width="200"><div class="cell">姓名</div></th>
            <th width="200"><div class="cell">年龄</div></th>
            <th width="200"><div class="cell">年龄</div></th>
            <th width="200"><div class="cell">操作</div></th>
            <th width="200"><div class="cell">addsomthing</div></th>
            <th width="200"><div class="cell">addsomthing</div></th>
          </tr>
        </thead>
        <tbody v-if="datas.length > 0">
          <tr v-for="(item, index) in datas" :key="index">
            <td>
              <div class="cell">
                <input
                  @change="singleSelect(item, index)"
                  v-model="item.isCheck"
                  type="checkbox"
                />
              </div>
            </td>
            <td>
              <div class="cell">{{ index + 1 }}</div>
            </td>
            <td>
              <div class="cell">{{ item.id }}</div>
            </td>
            <td>
              <div class="cell">{{ item.name }}</div>
            </td>
            <td>
              <div class="cell">{{ item.age }}</div>
            </td>
            <td>
              <!-- <b-form-select v-model="selected[index]" :options="options" :ref="`list${index}`"></b-form-select> -->
              <!-- <b-form-select v-model="selected[index]" :options="options" ref="clearRefs"></b-form-select> -->
              <select
                name=""
                id=""
                v-model="item.value"
                @change="changeselect(index)"
              >
                <option
                  v-for="(item1, index1) in options"
                  :value="item1.value"
                  :key="index1"
                >
                  {{ item1.text }}
                </option>
              </select>
              <!-- <div>{{item1.value}}</div> -->
              <div>{{ item.value }}</div>

              <div>{{ selected[index] }}</div>
              <div>{{ selected }}</div>
            </td>
            <td>
              <!-- <div :class="item.classValue">{{ item.classValue }}
              </div> -->

              <div v-if="item.classValue == 'show1'">
                show1
                <b-form-input placeholder="Enter your name" v-model="item.inputtext"></b-form-input>
              </div>
              <div v-else-if="item.classValue == 'show2'">
                show2
                <b-form-textarea
                  id="textarea"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                  v-model="item.inputarea"
                ></b-form-textarea>
              </div>
              <div v-else-if="item.classValue == 'show3'">
                show3
                <b-form-datepicker
                  id="example-datepicker"
                  class="mb-2"
                ></b-form-datepicker>
              </div>
            </td>

            <td>
              <div class="cell">
                <button @click="clearitem(index)">clear</button>
              </div>
            </td>
            <td><button>查询</button><button>删除</button></td>
          </tr>
          <tr v-if="datas.length === 0">
            <td colspan="3"><div class="cell noDatas">暂无数据</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import goodsjson from "./goodsjson.json";
export default {
  name: "component_name",

  data() {
    return {
      goodsData: goodsjson,
      goodsList: [],
      // 保存选中的项
      saveSelectItems: [],
      checkAllBox: false,
      olddatas: [
        {
          id: "10001",
          name: "姓名1",
          age: "21",
          isCheck: false,
          value: "",
          classValue: "",
          inputtext:"input-text",
          inputarea:"input-area"
        },
        {
          id: "10002",
          name: "姓名2",
          age: "22",
          isCheck: false,
          value: "",
          classValue: "",
          inputtext:"input-text",
          inputarea:"input-area"
        },
        {
          id: "10003",
          name: "姓名3",
          age: "23",
          isCheck: false,
          value: "",
          classValue: "",
          inputtext:"input-text",
          inputarea:"input-area"
        },
        {
          id: "10004",
          name: "姓名4",
          age: "24",
          isCheck: false,
          value: "",
          classValue: "show1",
          inputtext:"input-text",
          inputarea:"input-area"
        },
        {
          id: "10005",
          name: "姓名5",
          age: "25",
          isCheck: false,
          value: "",
          classValue: "show2",
          inputtext:"input-text",
          inputarea:"input-area"
        },
      ],
      selected: [],
      options: [
        { value: null, text: "Please select an option" },
        { value: "1", text: "option1" },
        { value: "2", text: "option2" },
        { value: "3", text: "option3" },
        { value: "4", text: "toption4-disable", disabled: true },
      ],
      datas: [],
      isshow: false,
    };
  },
  created() {
    this.olddatas.map((item, index) => {
      this.datas.push(Object.assign({}, item, { value: "动态初始值" }));
    });
    console.log(this.datas);
  },
  mounted() {
    this.goodsList = this.goodsData.result.list;
    // console.log(this.goodsData);
    // let _arr = [];
  },
  computed: {
    datavalue: {
      get() {
        var valueArr = this.datas.map((item) => ({ value: "" }));
        // console.log(valueArr);
        return valueArr;
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  methods: {
    // 下拉框改变事件
    changeselect(i) {
      // console.log(i);
      // console.log(this.datas[i].value);
      let str= "show"+this.datas[i].value
      console.log(str);
      // this.datas[i].classValue=`show${i+1}`
      this.datas[i].classValue=str
      this.datas[i].inputtext= "你选了第"+this.datas[i].value
    },
    clearitem(i) {
      // console.log(this.$refs[`list${i}`][0]);
      // console.log(this.$refs[`list${i}`][0].options);
      this.$nextTick((res) => {
        // console.log(this.$refs.clearRefs.query);
        this.datas[i].value = null;
      });
    },
    addnew() {},
    checkedAll() {
      if (this.datas.length > 0) {
        for (let i = 0; i < this.datas.length; i++) {
          //  点击全选按钮
          if (this.checkAllBox) {
            //调用内置$set属性，将所有设为true
            //  this.$set(this.datas[i],'isCheck',true)
            this.datas[i].isCheck = true;
            //  调用保存所有保存已选项目
            this.checkAllIsChecked(this.datas[i], true);
          } else {
            this.$set(this.datas[i], "isCheck", false);
            this.checkAllIsChecked(this.datas[i], false);
          }
        }
      }
    },
    // 全选时保存已选项目
    checkAllIsChecked(item, isflag) {
      let count = 0;
      // isflag是true时说明已单选过
      if (isflag) {
        // 判断是否已有改数据避免重复
        if (this.saveSelectItems.length > 0) {
          for (let i = 0; i < this.saveSelectItems.length; i++) {
            if (this.saveSelectItems[i].id === item.id) {
              console.log(item.id);
              // 又设置一遍=true？
              this.saveSelectItems[i].isCheck === isflag;
              count++;
            }
          }
          if (count < 1) {
            item.isCheck = isflag;
            this.saveSelectItems.push(item);
          }
          // 原来没有保存任何数据时就直接放
        } else {
          console.log(item.id);

          item.isCheck = isflag;
          this.saveSelectItems.push(item);
        }
        // isflag 是false时，取消全选时
      } else {
        if (this.saveSelectItems.length > 0) {
          for (let j = 0; j < this.saveSelectItems.length; j++) {
            if (this.saveSelectItems[j].id === item.id) {
              // 操作数组 删除所有被选中id的项
              this.saveSelectItems.splice(j, 1);
            }
          }
        }
      }
      // console.log(this.saveSelectItems);
    },
    /*
         单选
         @param item 当前选中的项
         @param index 当前的索引
        */
    singleSelect(item, index) {
      // 用v-for时一般有个属性为index
      this.$set(this.datas[index], "isCheck", item.isCheck);
      // 单选后保存选中数据
      if (item.isCheck) {
        this.saveSelectItems.push(item);
      } else {
        // 个别封装删除已保存数据
        this.delItem(item);
      }
      // 单选都选完时对应修改全选状态
      const checkCount = this.isCheckAllFunc();
      if (checkCount === this.datas.length) {
        this.checkAllBox = true;
      } else {
        this.checkAllBox = false;
      }
      console.log(this.saveSelectItems);
    },
    // 仅循环计算下 多少个checked
    isCheckAllFunc() {
      let count = 0;
      if (this.datas.length > 0) {
        for (let i = 0; i < this.datas.length; i++) {
          if (this.datas[i].isCheck) {
            count++;
          }
        }
      }
      return count;
    },
    delItem(item) {
      if (this.saveSelectItems.length > 0) {
        for (let i = 0; i < this.saveSelectItems.length; i++) {
          if (this.saveSelectItems[i].id === item.id) {
            this.saveSelectItems.splice(i, 1);
          }
        }
      }
    },
    // 下面时请求时用的函数
    /*
          分页请求后返回新数据的时候，该每一项设置属性 isCheck 为 false，但是当数组内部有保存的数据时，
          且该保存的数据id和请求返回回来的id相同的话，就把该项选中，比如我勾选了第一页中的某一项，会把
          该项的id保存到数组内部去，当切换到第二页的时候，那么再返回到第一页的时候，会获取该id是否与数组的
          id是否相同，如果相同的话，就把该项数据选中
        */
    addIsChecked(datas) {
      let count = 0;
      if (datas.length > 0) {
        for (let i = 0; i < datas.length; i++) {
          datas[i].isCheck = false;
          if (this.saveSelectItems.length > 0) {
            for (let j = 0; j < this.saveSelectItems.length; j++) {
              if (datas[i].id === this.saveSelectItems[j].id) {
                datas[i].isCheck = true;
                count++;
              }
            }
          }
        }
      }
      if (this.datas.length !== 0 && count === this.pageSize) {
        this.checkAllBox = true;
      }
      return datas;
    },
    query() {},
  },
};
</script>
<style scoped>
.show1 {
  background-color: #f44336;
}
.show2 {
  background-color: aquamarine;
}
.show3 {
  background-color: blueviolet;
  display: none;
}
#table table {
  width: 100%;
  font-size: 14px;
  border: 1 solid #eee;
}
table {
  padding: 10px;
  background-color: #f5f5f5;
  text-align: left;
}
table tbody th {
  padding: 10px;
  text-align: left;
  background: #f5f5f5;
}
table tbody th {
  padding: 10px;
  text-align: left;
  border: 1px solid #eee;
}
ul,
li {
  list-style: none;
}
.tb-table-list {
  width: 100%;
}
.tb-table-list.title h3 {
  float: left;
  font-size: 16px;
  margin: 0;
  margin-top: 6px;
  font-weight: 400;
}
.tb-table-list.title.operation {
  float: right;
  font-size: 16px;
}
.tb-table-list .tb-table2 {
  width: 100%;
  float: left;
  border: 1px solid #dfe6ec;
  border-right: none;
  margin-top: 10px;
  margin-bottom: 30px;
  border-bottom: none;
}
.tb-table-list .tb-table2 th {
  background-color: #f2f2f2;
  height: 40px;
}
.tb-table-list .tb-table2 tr {
  height: 40px;
}
.tb-table-list .tb-table2 td,
.tb-table-list .tb-table2 th {
  position: relative;
  border-bottom: 1px solid #dfe6ec;
  text-overflow: ellipsis;
  vertical-align: middle;
  padding: 5px;
  text-align: center;
  border-right: 1px solid #dfe6ec;
}
.tb-table-list .tb-table2 td.cell,
.tb-table-list .tb-table2 th.cell {
  text-align: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break -all;
  padding-right: 2px;
  padding-left: 2px;
  overflow: hidden;
}
.tb-table-list .tb-table2 td.noDatas,
.tb-table-list .tb-table2 th.noDatas {
  text-align: left;
}
.tb-table-list .tb-table2.tb-arrow-up {
  position: absolute;
  bottom: -1px;
  color: #d6e4f0;
  font-size: 22px;
  height: 13px;
  background: #fff;
  left: 45%;
  z-index: 100;
}
.tb-table-list .tb-table2.cursor-item {
  cursor: pointer;
}
.tb-table-style .tb-table2 td {
  text-align: center;
}
.tb-table-style td.thead {
  background: #ebf0f4;
  color: #000;
}
.tb-table-style .tb-table2 .current {
  background-color: #f44336;
  color: #fff;
}
</style>    