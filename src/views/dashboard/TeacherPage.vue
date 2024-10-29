<template>
    <div class="teacher-view">
      <NavBar title="网络安全实验中心--教师端" isLoggedIn="true"></NavBar>
      <el-row>
        <el-col :span="4" class="menu-col">
          <el-menu default-active="1" @select="handleSelect">
            <el-menu-item index="1">报备审核</el-menu-item>
            <el-menu-item index="2">记录审核</el-menu-item>
          </el-menu>
        </el-col>
  
        <el-col :span="20">
          <!-- 报备审核 -->
          <div v-if="activeTab === '1'" class="right-col">
            <h2>报备审核</h2>
            <el-input
              v-model="searchQuery"
              placeholder="搜索记录"
              clearable
            ></el-input>
            <el-table
              :data="filteredReports"
              :default-sort="{ prop: 'report_date', order: 'descending' }"
            >
              <el-table-column prop="name" label="比赛名"></el-table-column>
              <el-table-column prop="student_name" label="学生姓名"></el-table-column>
              <el-table-column prop="student_id" label="学号"></el-table-column>
              <el-table-column prop="level" label="等级"></el-table-column>
              <el-table-column label="操作" align="center">
                <template #default="{ row }">
                  <el-button-group>
                    <el-button type="primary" size="small" @click="approveReport(row.id)">通过</el-button>
                    <el-button type="danger" size="small" @click="rejectReport(row.id)">拒绝</el-button>
                    <el-button type="info" size="small" @click="showReportDetails(row)">详情</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </div>
  
          <!-- 记录审核 -->
          <div v-if="activeTab === '2'" class="right-col">
            <h2>记录审核</h2>
            <el-input
              v-model="searchQuery"
              placeholder="搜索记录"
              clearable
            ></el-input>
            <el-table :data="filteredRecords">
              <el-table-column prop="name" label="比赛名"></el-table-column>
              <el-table-column prop="student_name" label="学生姓名"></el-table-column>
              <el-table-column prop="student_id" label="学号"></el-table-column>
              <el-table-column prop="level" label="等级"></el-table-column>
              <el-table-column label="操作" align="center">
                <template #default="{ row }">
                  <el-button-group>
                    <el-button type="primary" size="small" @click="approveRecord(row.id)">通过</el-button>
                    <el-button type="danger" size="small" @click="rejectRecord(row.id)">拒绝</el-button>
                    <el-button type="info" size="small" @click="showRecordDetails(row)">详情</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
  
      <!-- 报备详细信息弹窗 -->
      <el-dialog v-model="reportDialogVisible" title="报备详细信息">
        <div>
          <p>学生姓名: {{ selectedReport.student_name }}</p>
          <p>学号: {{ selectedReport.student_id }}</p>
          <p>比赛名: {{ selectedReport.name }}</p>
          <p>比赛开始时间: {{ selectedReport.start_time }}</p>
          <p>比赛结束时间: {{ selectedReport.end_time }}</p>
          <p>比赛级别: {{ selectedReport.level }}</p>
          <p>提交时间: {{ selectedReport.report_date }}</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="reportDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
  
      <!-- 记录详细信息弹窗 -->
      <el-dialog v-model="recordDialogVisible" title="记录详细信息">
        <div>
          <p>学生姓名: {{ selectedRecord.student_name }}</p>
          <p>学号: {{ selectedRecord.student_id }}</p>
          <p>比赛名: {{ selectedRecord.name }}</p>
          <p>比赛级别: {{ selectedRecord.level }}</p>
          <p>比赛照片:</p>
          <el-image
            v-for="photo in selectedRecord.photos"
            :key="photo"
            :src="photo"
            style="width: 100px; margin-right: 10px"
            :fit="'contain'"
          />
          <p>比赛总结: {{ selectedRecord.summary }}</p>
          <p>成绩证明:</p>
          <el-image
            :src="selectedRecord.grade_proof"
            style="width: 100px; margin-right: 10px"
            :fit="'contain'"
          />
          <p>报销金额: {{ selectedRecord.reimbursement }}</p>
          <p>报销凭证:</p>
          <el-image
            v-for="voucher in selectedRecord.vouchers"
            :key="voucher"
            :src="voucher"
            style="width: 100px; margin-right: 10px"
            :fit="'contain'"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="recordDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import NavBar from "@/components/NavBar.vue";
  import { ref, onMounted, computed } from "vue";
  import axios from "axios";
  import { ElMessage } from "element-plus";
  
  // 响应式数据
  const activeTab = ref("1");
  const searchQuery = ref("");
  const reportList = ref([]);
  const recordList = ref([]);
  const reportDialogVisible = ref(false);
  const recordDialogVisible = ref(false);
  const selectedReport = ref({});
  const selectedRecord = ref({});
  
  // 获取报备记录列表
  const getReports = async () => {
    try {
      const res = await axios.get("http://localhost:8000/Teacher/report/list/", {
        withCredentials: true,
      });
      reportList.value = res.data.data;
    } catch (error) {
      ElMessage.error("获取报备列表失败!");
    }
  };
  
  // 获取记录列表
  const getRecords = async () => {
    try {
      const res = await axios.get("http://localhost:8000/Teacher/record/list/", {
        withCredentials: true,
      });
      recordList.value = res.data.data;
    } catch (error) {
      ElMessage.error("获取记录列表失败!");
    }
  };
  
  // 审核通过报备
  const approveReport = async (id) => {
    try {
      await axios.post(
        `http://localhost:8000/Teacher/report/approve/${id}/`,
        {},
        { withCredentials: true }
      );
      ElMessage.success("报备审核通过!");
      await getReports();
    } catch (error) {
      ElMessage.error("审核失败!");
    }
  };
  
  // 审核拒绝报备
  const rejectReport = async (id) => {
    try {
      await axios.post(
        `http://localhost:8000/Teacher/report/reject/${id}/`,
        {},
        { withCredentials: true }
      );
      ElMessage.success("报备审核拒绝!");
      await getReports();
    } catch (error) {
      ElMessage.error("审核失败!");
    }
  };
  
  // 审核通过记录
  const approveRecord = async (id) => {
    try {
      await axios.post(
        `http://localhost:8000/Teacher/record/approve/${id}/`,
        {},
        { withCredentials: true }
      );
      ElMessage.success("记录审核通过!");
      await getRecords();
    } catch (error) {
      ElMessage.error("审核失败!");
    }
  };
  
  // 审核拒绝记录
  const rejectRecord = async (id) => {
    try {
      await axios.post(
        `http://localhost:8000/Teacher/record/reject/${id}/`,
        {},
        { withCredentials: true }
      );
      ElMessage.success("记录审核拒绝!");
      await getRecords();
    } catch (error) {
      ElMessage.error("审核失败!");
    }
  };
  
  // 显示报备详细信息
  const showReportDetails = (report) => {
    selectedReport.value = report;
    reportDialogVisible.value = true;
  };
  
  // 显示记录详细信息
  const showRecordDetails = (record) => {
    selectedRecord.value = record;
    recordDialogVisible.value = true;
  };
  
  // 切换 Tab
  const handleSelect = (index) => {
    activeTab.value = index;
    if (index === "1") {
      getReports();
    } else {
      getRecords();
    }
  };
  
  // 计算过滤后的报备记录
  const filteredReports = computed(() => {
    return reportList.value.filter(
      (report) =>
        report.name.includes(searchQuery.value) ||
        report.student_name.includes(searchQuery.value) ||
        report.student_id.includes(searchQuery.value) ||
        report.level.includes(searchQuery.value)
    );
  });
  
  // 计算过滤后的记录
  const filteredRecords = computed(() => {
    return recordList.value.filter(
      (record) =>
        record.name.includes(searchQuery.value) ||
        record.student_name.includes(searchQuery.value) ||
        record.student_id.includes(searchQuery.value) ||
        record.level.includes(searchQuery.value)
    );
  });
  
  // 页面加载完成后执行
  onMounted(() => {
    getReports();
    getRecords();
  });
  </script>
  
  <style scoped>
  .teacher-view {
    min-height: 92vh;
    background-color: #ffffff;
  }
  .menu-col {
    border-right: 1px solid #ffffff;
    padding-top: 100px;
  }
  .right-col {
    padding: 20px;
  }
  .dialog-footer {
    text-align: right;
  }
  </style>
  