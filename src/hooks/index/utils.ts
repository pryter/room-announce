export const updateTaskfromSection = (setTasks, section) => {

  if (section === "credentials") {
    setTasks(prev => ([
      {...prev[0], status: "success"},
      {...prev[1], status: "current"},
      prev[2]
    ]))
  }

  if (section === "display") {
    setTasks(prev => ([
      prev[0],
      {...prev[1], status: "success"},
      {...prev[2], status: "current"}
    ]))
  }

  if (section === "saved") {
    setTasks(prev => ([
      prev[0],
      prev[1],
      {...prev[2], status: "success"}
    ]))
  }
}