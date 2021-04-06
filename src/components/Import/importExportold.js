import React from "react";
import { NavBar } from "../navBar/navBar.js";
import { ExcelRenderer, OutTable } from "react-excel-renderer"; // This library might help
import ReactToExcel from 'react-html-table-to-excel';
import { Table, Button, Popconfirm, Row, Col, Icon, Upload } from "antd";

import { EditableFormRow, EditableCell } from "./editable";

import "antd/dist/antd.css";
import {XLSX} from "xlsx";
import {saveAs} from "filesaver";




export class ImportExport extends React.Component {
    
	constructor(props) {
		super(props);
		this.state = {
		  cols: [],
		  rows: [],
		  errorMessage: null,
		  columns: [
			{
			  title: " ",
			  dataIndex: "b1",
			  editable: true
			},
			{
			  title: " ",
			  dataIndex: "b2",
			  editable: true
			},
			{
			  title: " ",
			  dataIndex: "b3",
			  editable: true
			},
			{
				title: " ",
				dataIndex: "b4",
				editable: true
			},
			{
				title: " ",
				dataIndex: "b5",
				editable: true
			},
			{
				title: "Code",
				dataIndex: "code",
				editable: true
			},
			{
				title: "CAB201",
				dataIndex: "cab2011",
				editable: true
			},
			{
				title: "CAB201",
				dataIndex: "cab2012",
				editable: true
			},
			{
				title: "CAB202",
				dataIndex: "cab2021",
				editable: true
			},
			{
				title: "CAB202",
				dataIndex: "cab2022",
				editable: true
			},
			{
				title: "CAB203",
				dataIndex: "cab203",
				editable: true
			},
			{
				title: "CAB210",
				dataIndex: "cab210",
				editable: true
			},
			{
				title: "CAB220",
				dataIndex: "cab220",
				editable: true
			},
			{
				title: "CAB230",
				dataIndex: "cab230",
				editable: true
			},
			{
				title: "CAB240",
				dataIndex: "cab240",
				editable: true
			},
			{
				title: "CAB301",
				dataIndex: "cab301",
				editable: true
			},
			{
				title: "CAB302",
				dataIndex: "cab302",
				editable: true
			},
			{
				title: "CAB303",
				dataIndex: "cab303",
				editable: true
			},
			{
				title: "CAB310",
				dataIndex: "cab310",
				editable: true
			},
			{
				title: "CAB330",
				dataIndex: "cab330",
				editable: true
			},
			{
				title: "CAB340",
				dataIndex: "cab340",
				editable: true
			},
			{
				title: "CAB401",
				dataIndex: "cab401",
				editable: true
			},
			{
				title: "CAB402",
				dataIndex: "cab402",
				editable: true
			},
			{
				title: "CAB402",
				dataIndex: "cab402",
				editable: true
			},
			{
				title: "CAB403",
				dataIndex: "cab403",
				editable: true
			},
			{
				title: "CAB430",
				dataIndex: "cab430",
				editable: true
			},
			{
				title: "CAB431",
				dataIndex: "cab431",
				editable: true
			},
			{
				title: "CAB432",
				dataIndex: "cab432",
				editable: true
			},
			{
				title: "CAB440",
				dataIndex: "cab440",
				editable: true
			},
			{
				title: "CAB441",
				dataIndex: "cab441",
				editable: true
			},
			{
				title: "ENN523",
				dataIndex: "enn523",
				editable: true
			},
			{
				title: "ENN524",
				dataIndex: "enn524",
				editable: true
			},
			{
				title: "ENN541",
				dataIndex: "enn541",
				editable: true
			},
			{
				title: "IFB102",
				dataIndex: "ifb1021",
				editable: true
			},
			{
				title: "IFB102",
				dataIndex: "ifb1022",
				editable: true
			},
			{
				title: "IFB104",
				dataIndex: "ifb1041",
				editable: true
			},
			{
				title: "IFB104",
				dataIndex: "ifb1042",
				editable: true
			},
			{
				title: "IFB398",
				dataIndex: "ifb3981",
				editable: true
			},
			{
				title: "IFB398",
				dataIndex: "ifb3982",
				editable: true
			},
			{
				title: "IFN507",
				dataIndex: "ifn5071",
				editable: true
			},
			{
				title: "IFN507/IFQ507",
				dataIndex: "ifn5072",
				editable: true
			},
			{
				title: "IFN509",
				dataIndex: "ifn5091",
				editable: true
			},
			{
				title: "IFN509/IFQ509",
				dataIndex: "ifn5092",
				editable: true
			},
			{
				title: "IFN541",
				dataIndex: "ifn5411",
				editable: true
			},
			{
				title: "IFN541/IFQ541",
				dataIndex: "ifn5412",
				editable: true
			},
			{
				title: "IFN551/IFQ551",
				dataIndex: "ifn5511",
				editable: true
			},
			{
				title: "IFN551/IFQ551",
				dataIndex: "ifn5512",
				editable: true
			},
			{
				title: "IFN553/IFQ553",
				dataIndex: "ifn5531",
				editable: true
			},
			{
				title: "IFN553/IFQ553",
				dataIndex: "ifn5532",
				editable: true
			},
			{
				title: "IFN555/IFQ555",
				dataIndex: "ifn5551",
				editable: true
			},
			{
				title: "IFN555/IFQ555",
				dataIndex: "ifn5552",
				editable: true
			},
			{
				title: "IFN556/IFQ556",
				dataIndex: "ifn5561",
				editable: true
			},
			{
				title: "IFN556/IFQ556",
				dataIndex: "ifn5562",
				editable: true
			},
			{
				title: "IFN563",
				dataIndex: "ifn5631",
				editable: true
			},
			{
				title: "IFN563/IFQ563",
				dataIndex: "ifn5632",
				editable: true
			},
			{
				title: "IFN564",
				dataIndex: "ifn5641",
				editable: true
			},
			{
				title: "IFN564/IFQ564",
				dataIndex: "ifn5642",
				editable: true
			},
			{
				title: "IFN591",
				dataIndex: "ifn5911",
				editable: true
			},
			{
				title: "IFN591/IFQ591",
				dataIndex: "ifn5912",
				editable: true
			},
			{
				title: "IFN644",
				dataIndex: "ifn644",
				editable: true
			},
			{
				title: "IFN645",
				dataIndex: "ifn645",
				editable: true
			},
			{
				title: "IFN646",
				dataIndex: "ifn646",
				editable: true
			},
			{
				title: "IFN647",
				dataIndex: "ifn647",
				editable: true
			},
			{
				title: "IFN648",
				dataIndex: "ifn648",
				editable: true
			},
			{
				title: "IFN657",
				dataIndex: "ifn657",
				editable: true
			},
			{
				title: "IFN666",
				dataIndex: "ifn666",
				editable: true
			},
			{
				title: "IFN680",
				dataIndex: "ifn680",
				editable: true
			},
			{
				title: "IFN692",
				dataIndex: "ifn692",
				editable: true
			},
			{
				title: "IFN703",
				dataIndex: "ifn703",
				editable: true
			},
			{
				title: "IFN704",
				dataIndex: "ifn704",
				editable: true
			},
			{
				title: "IFN712",
				dataIndex: "ifn712",
				editable: true
			},
			{
				title: "IGB100",
				dataIndex: "igb100",
				editable: true
			},
			{
				title: "IGB180",
				dataIndex: "igb180",
				editable: true
			},
			{
				title: "IGB181",
				dataIndex: "igb181",
				editable: true
			},
			{
				title: "IGB200",
				dataIndex: "igb200",
				editable: true
			},
			{
				title: "IGB220",
				dataIndex: "igb220",
				editable: true
			},
			{
				title: "IGB283",
				dataIndex: "igb283",
				editable: true
			},
			{
				title: "IGB300",
				dataIndex: "igb300",
				editable: true
			},
			{
				title: "IGB301",
				dataIndex: "igb301",
				editable: true
			},
			{
				title: "IGB320",
				dataIndex: "igb320",
				editable: true
			},
			{
				title: "IGB321",
				dataIndex: "igb321",
				editable: true
			},
			{
				title: "IGB381",
				dataIndex: "igb381",
				editable: true
			},
			{
				title: "IGB383",
				dataIndex: "igb383",
				editable: true
			},
			{
				title: "IGB400",
				dataIndex: "igb400",
				editable: true
			},
			{
				title: " ",
				dataIndex: "b6",
				editable: true
			},
			{
				title: " ",
				dataIndex: "b7",
				editable: true
			},
			{
				title: " ",
				dataIndex: "b8",
				editable: true
			},
			{
				title: " ",
				dataIndex: "b9",
				editable: true
			},
			{
				title: " ",
				dataIndex: "b10",
				editable: true
			},
			{
				title: " ",
				dataIndex: "b11",
				editable: true
			},
			{
				title: "IFN664",
				dataIndex: "ifn664",
				editable: true
			},
			{
				title: "CAB420",
				dataIndex: "cab420",
				editable: true
			},
			{
				title: "CAB320",
				dataIndex: "cab320",
				editable: true
			},
			{
			  title: "Action",
			  dataIndex: "action",
			  render: (text, record) =>
				this.state.rows.length >= 1 ? (
				  <Popconfirm
					title="Sure to delete?"
					onConfirm={() => this.handleDelete(record.key)}
				  >
					<Icon
					  type="delete"
					  theme="filled"
					  style={{ color: "red", fontSize: "20px" }}
					/>
				  </Popconfirm>
				) : null
			}
		  ]
		};
		
	  }
	
	  

	  handleSave = row => {
		const newData = [...this.state.rows];
		const index = newData.findIndex(item => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, {
		  ...item,
		  ...row
		});
		this.setState({ rows: newData });
	  };
	
	  checkFile(file) {
		let errorMessage = "";
		if (!file || !file[0]) {
		  return;
		}
		const isExcel =
		  file[0].type === "application/vnd.ms-excel" ||
		  file[0].type ===
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		if (!isExcel) {
		  errorMessage = "You can only upload Excel file!";
		}
		console.log("file", file[0].type);
		const isLt2M = file[0].size / 1024 / 1024 < 2;
		if (!isLt2M) {
		  errorMessage = "File must be smaller than 2MB!";
		}
		console.log("errorMessage", errorMessage);
		return errorMessage;
	  }
	
	  fileHandler = fileList => {
		console.log("fileList", fileList);
		let fileObj = fileList;
		if (!fileObj) {
		  this.setState({
			errorMessage: "No file uploaded!"
		  });
		  return false;
		}
		console.log("fileObj.type:", fileObj.type);
		if (
		  !(
			fileObj.type === "application/vnd.ms-excel" ||
			fileObj.type ===
			  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		  )
		) {
		  this.setState({
			errorMessage: "Unknown file format. Only Excel files are uploaded!"
		  });
		  return false;
		}

		//just pass the fileObj as parameter
		ExcelRenderer(fileObj, (err, resp) => {
			if (err) {
			  console.log(err);
			} else {
			  let newRows = [];
			  resp.rows.slice(1).map((row, index) => {
				if (row && row !== "undefined") {
				  newRows.push({
					key: index,
					b1: row[0],
					b2: row[1],
					b3: row[2],
					b4: row[3],
					b5: row[4],
					code: row[5],
					cab2011: row[6],
					cab2012: row[7],
					cab2021: row[8],
					cab2022: row[9],
					cab203: row[10],
					cab210: row[11],
					cab220: row[12],
					cab230: row[13],
					cab240: row[14],
					cab301: row[15],
					cab302: row[16],
					cab303: row[17],
					cab310: row[18],
					cab330: row[19],
					cab340: row[20],
					cab401: row[21],
					cab402: row[22],
					cab403: row[23],
					cab430: row[24],
					cab431: row[25],
					cab432: row[26],
					cab440: row[27],
					cab441: row[28],
					enn523: row[29],
					enn524: row[30],
					enn541: row[31],
					ifb1021: row[32],
					ifb1022: row[33],
					ifb1041: row[34],
					ifb1042: row[35],
					ifb3981: row[36],
					ifb3982: row[37],
					ifn5071: row[38],
					ifn5072: row[39],
					ifn5091: row[40],
					ifn5092: row[41],
					ifn5411: row[42],
					ifn5412: row[43],
					ifn5511: row[44],
					ifn5512: row[45],
					ifn5531: row[46],
					ifn5532: row[47],
					ifn5551: row[48],
					ifn5552: row[49],
					ifn5561: row[50],
					ifn5562: row[51],
					ifn5631: row[52],
					ifn5632: row[53],
					ifn5641: row[54],
					ifn5642: row[55],
					ifn5911: row[56],
					ifn5912: row[57],
					ifn644: row[58],
					ifn645: row[59],
					ifn646: row[60],
					ifn647: row[61],
					ifn648: row[62],
					ifn657: row[63],
					ifn666: row[64],
					ifn680: row[65],
					ifn692: row[66],
					ifn703: row[67],
					ifn704: row[68],
					ifn712: row[69],
					igb100: row[70],
					igb180: row[71],
					igb181: row[72],
					igb200: row[73],
					igb220: row[74],
					igb283: row[75],
					igb300: row[76],
					igb301: row[77],
					igb320: row[78],
					igb321: row[79],
					igb381: row[80],
					igb383: row[81],
					igb400: row[82],
					b6: row[83],
					b7: row[84],
					b8: row[85],
					b9: row[86],
					b10: row[87],
					b11: row[88],
					ifn644: row[89],
					cab420: row[90],
					cab320: row[91],
				  });
				}
			  });
			  if (newRows.length === 0) {
				this.setState({
				  errorMessage: "No data found in file!"
				});
				return false;
			  } else {
				this.setState({
				  cols: resp.cols,
				  rows: newRows,
				  errorMessage: null
				});
			  }
			}
		  });
		  return false;
		};
	  
		handleDownload = () => {
			
			
			
			var table = document.getElementById("mysubtable")
			for (var i = 0; i < this.state.rows.length; i ++){
				var row = `<tr>
							   <td>${this.state.rows[i].unitcode}</td>
							   <td>${this.state.rows[i].unitname}</td>
							   <td>${this.state.rows[i].semester}</td>
							   <td>${this.state.rows[i].students}</td>
							   <td>${this.state.rows[i].academic}</td>
							   <td>${this.state.rows[i].unitload}</td>
						   </tr>`
				table.innerHTML += row
			}
			
			
		};
	  
		handleDelete = key => {
		  const rows = [...this.state.rows];
		  this.setState({ rows: rows.filter(item => item.key !== key) });
		};
		handleAdd = () => {
		  const { count, rows } = this.state;
		  const newData = {
			key: count,
			unitcode: "CAB432",
			unitname: "Cloud Computing",
			semester: "2020-2",
			students: "192",
			academic: "First Academic",
			unitload: "0.5"
		  };
		  this.setState({
			rows: [newData, ...rows],
			count: count + 1
		  });
		};

    render(){
		const components = {
			body: {
			  row: EditableFormRow,
			  cell: EditableCell
			}
		  };
		  const columns = this.state.columns.map(col => {
			if (!col.editable) {
			  return col;
			}
			return {
			  ...col,
			  onCell: record => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave: this.handleSave
			  })
			};
		  });
    return (
		
      <div class="container">
      
      <NavBar />
	  <script src="FileSaver.min.js"></script>
	  <script src="xlsx.full.min.js"></script>
      <>
        <h1>Importing Excel Component</h1>
        <Row gutter={16}>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5%"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="page-title">Upload Farmer Data</div>
            </div>
          </Col>
          <Col span={8}>
            <a
              href="https://res.cloudinary.com/bryta/raw/upload/v1562751445/Sample_Excel_Sheet_muxx6s.xlsx"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Sample excel sheet
            </a>
          </Col>
          <Col
            span={8}
            align="right"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {this.state.rows.length > 0 && (
              <>
                <Button
                  onClick={this.handleAdd}
                  size="large"
                  type="info"
                  style={{ marginBottom: 16 }}
                >
                  <Icon type="plus" />
                  Add a row
                </Button>{" "}
                <Button
                  onClick={this.handleDownload}
                  size="large"
                  type="primary"
                  style={{ marginBottom: 16, marginLeft: 10 }}
                >
                  Display table
                </Button>
              </>
            )}
          </Col>
        </Row>
        <div>
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            onRemove={() => this.setState({ rows: [] })}
            multiple={false}
          >
            <Button>
              <Icon type="upload" /> Click to Upload Excel File
            </Button>
          </Upload>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table
		  	id="newtable"
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={this.state.rows}
            columns={columns}
          />
        </div>
      </>
      <div>
		  <html>
      <table border="4" id="mytable">
						<thead>
							<tr class="table100-head">
								<th class="column1">Unit Code</th>
								<th class="column2">Unit Name</th>
								<th class="column3">Semester</th>
								<th class="column4">Students</th>
								<th class="column5">Academic</th>
								<th class="column6">Unit Load</th>
							</tr>
						</thead>
						<tbody id="mysubtable">
								
								
						</tbody>
					</table>
			
        

          <ReactToExcel 
            classname="btn"
            table ="mytable"
            filename="excelFile"
            sheet="sheet 1"
            buttonText="EXPORT"
          />
		  </html>
		</div>
      </div>
    );
  } 
}
export default ImportExport; 