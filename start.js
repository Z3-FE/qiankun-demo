// const readline = require('readline');
// const { spawn, spawnSync } = require('child_process');

// // 创建 readline 接口
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // 定义项目启动命令和顺序
// const projectCommands = [
//   'start:main', // 替换为您项目1的启动命令
//   'start:html', // 替换为您项目2的启动命令
//   'start:react', // 替换为您项目3的启动命令
// ];

// // 打印项目选项
// console.log('Available Projects:');
// projectCommands.forEach((command, index) => {
//   console.log(`${index + 1}: Start Project ${index + 1}`);
// });

// // 提示用户输入项目序号，以逗号分隔多个项目
// rl.question('Enter project numbers to start (e.g., 1, 2, 3): ', (input) => {
//   rl.close();

//   const selectedProjects = input.split(',').map(Number).filter(Boolean);

//   if (selectedProjects.length === 0) {
//     console.log('No projects selected. Exiting.');
//     process.exit(0);
//   }

//   const commandsToRun = selectedProjects.map((projectIndex) => {
//     const projectCommand = projectCommands[projectIndex - 1];
//     if (projectCommand) {
//       return projectCommand;
//     }
//     console.error(`Invalid project number: ${projectIndex}`);
//     process.exit(1);
//   });
  
//   // 定义一个函数来递归地运行项目
//   const runProject = (index) => {
//     if (index >= commandsToRun.length) {
//       console.log('All projects have started successfully.');
//       return;
//     }
//     const command = commandsToRun[index];
//     console.log(`Starting Project ${index + 1}: ${command}`);
//     // 使用 npm-run-all 来顺序运行项目
//     const child = spawnSync('npm-run-all', [command], {shell:true, stdio: 'inherit' });
//     child.on('exit', (code) => {
//       if (code === 0) {
//         console.log(`Project ${index + 1} has started successfully.`);
//         runProject(index + 1); // 运行下一个项目
//       } else {
//         console.error(`Error starting Project ${index + 1}.`);
//         process.exit(code);
//       }
//     });
//   };

//   // 启动第一个项目
//   runProject(0);
// });








//目前能够并行执行多个的命令
const readline = require('readline');
const { spawn,spawnSync } = require('child_process');

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 定义项目启动命令和顺序
const projectCommands = [
  'npm run start:main', // 替换为您项目1的启动命令
  'npm run start:html', // 替换为您项目2的启动命令
  'npm run start:react', // 替换为您项目3的启动命令
];

// 打印项目选项
console.log('Available Projects:');
projectCommands.forEach((command, index) => {
  console.log(`${index + 1}: Start Project ${index + 1}`);
});

// 提示用户输入项目序号，以逗号分隔多个项目
rl.question('Enter project numbers to start (e.g., 1, 2, 3): ', (input) => {
  rl.close();

  const selectedProjects = input.split(',').map(Number).filter(Boolean);

  if (selectedProjects.length === 0) {
    console.log('No projects selected. Exiting.');
    process.exit(0);
  }

  const commandsToRun = selectedProjects.map((projectIndex) => {
    const projectCommand = projectCommands[projectIndex - 1];
    if (projectCommand) {
      return projectCommand;
    }
    console.error(`Invalid project number: ${projectIndex}`);
    process.exit(1);
  });
  // 启动项目
  console.log('commandsToRun',commandsToRun);
  //'--verbose',
  const child = spawn('concurrently', [...commandsToRun], { stdio: 'inherit' });

  child.on('exit', (code) => {
    if (code === 0) {
      console.log('All projects have started successfully.');
    } else {
      console.error('Error starting projects.');
    }
  });
});



// // 引入readline模块
// // Import readline module
// const readline = require('readline');

// // 引入concurrently模块
// // Import concurrently module
// const concurrently = require('concurrently');

// // 创建一个readline接口
// // Create a readline interface
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // 定义一个对象，存放序号和项目路径的映射关系
// // Define an object that stores the mapping relationship between numbers and project paths
// const projects = {
//   '1': 'start:main',
//   '2': 'start:html',
//   '3': 'start:react'
// };

// // 定义一个函数，用于根据用户输入的序号启动对应的项目
// // Define a function to start the corresponding project based on the user's input number
// function startProject(index,selectedProjects) {
//   // 如果输入的序号不在项目对象中，说明无效输入，提示用户重新输入
//   // If the input number is not in the project object, it means invalid input, prompt the user to re-enter
//   let number = selectedProjects[index]
//   if (!projects[number]) {
//     console.log('No projects selected. Exiting.');
//     process.exit(0);
//   }

//   // 根据输入的序号，从项目对象中获取对应的项目路径
//   // According to the input number, get the corresponding project path from the project object
//   const project = projects[number];



 
//   // 使用concurrently模块创建一个子进程数组，每个子进程执行node命令，并传入项目路径作为参数
//   // Use the concurrently module to create an array of child processes, each executing the node command and passing in the project path as an argument
//   const children = [
//     { command: `npm run ${project}`, name: `project${number}` }
//   ];

//   // 使用concurrently模块的run方法来运行子进程数组，并传入一些选项参数
//   // Use the run method of the concurrently module to run the array of child processes and pass in some option parameters
//   concurrently(children, {
//     // 当一个子进程失败时，终止其他子进程
//     // When one child process fails, terminate the other child processes
//     killOthers: ['true'],
//     // 给每个子进程的输出添加一个前缀，用于区分不同的项目
//     // Add a prefix to each child process's output to distinguish different projects
//     prefix: '{name}',
//     // 当所有子进程都退出时，调用回调函数，并传入退出码数组和错误数组
//     // When all child processes exit, call the callback function and pass in an array of exit codes and an array of errors
//     onSuccess: (exitCodes, errors) => {

//       // 打印退出码数组和错误数组
//       // Print the exit code array and error array
//       console.log('执行了吗');
//       if(index + 1 === selectedProjects.length){
//         return
//       }

//       startProject(selectedProjects[index+1],selectedProjects)
//     }
//   });
// }

// // 启动程序，提示用户输入序号，并调用startProject函数
// // Start the program, prompt the user to enter a number, and call the startProject function
// rl.question('Which project do you want to start? (1/2/3) ', (input) => {

//   const selectedProjects = input.split(',').map(Number).filter(Boolean);
//   if (selectedProjects.length === 0) {
//     console.log('No projects selected. Exiting.');
//     process.exit(0);
//   }
//   //从数组中第0个开始
//   startProject(0,selectedProjects)

// });
