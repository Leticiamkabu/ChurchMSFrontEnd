<template>
  <div class="upload-container">
    <h1>Import Members</h1>
    <form @submit.prevent="uploadFile">
      <input 
        type="file" 
        accept=".xlsx" 
        @change="handleFileUpload" 
        required 
      />
      <button type="submit" :disabled="!selectedFile">Upload</button>
    </form>
    <p v-if="responseMessage">{{ responseMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: null,
      responseMessage: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      if (!this.selectedFile) {
        this.responseMessage = "Please select a file!";
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile);

      try {
        const response = await axios.post("http://localhost:5000/members/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.responseMessage = response.data;
      } catch (error) {
        this.responseMessage = "Error uploading file: " + error.response?.data || error.message;
      }
    },
  },
};
</script>

<style>
.upload-container {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}

button {
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

button:hover:enabled {
  background-color: #45a049;
}
</style>
