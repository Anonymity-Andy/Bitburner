/** @param {NS} ns */
export async function main(ns) {
  // 打开日志
  ns.disableLog('ALL')
  ns.tail()
  await ns.sleep(1)
  ns.moveTail(900, 450)
  ns.resizeTail(500, 350)
  
  // 获得所有server的名字，一共69个
  var hostname = ns.scan("home")
  var number = 3
  while (number < hostname.length) {
    var temp = ns.scan(hostname[number])
    temp.shift() // 去除父节点
    for (var i = 0; i < temp.length; i++) {
      if (temp[i] in hostname == false){
        hostname.concat(temp[i])
      }
    }
    hostname = hostname.concat(temp)
    number++
  }
  ns.print(hostname)

  // 逐一获得服务器的权限
  for (var i = 0; i < hostname.length; i++) {
    var ports = 0
    if (ns.ls("home").includes("BruteSSH.exe")) {
      ns.brutessh(hostname[i])
      ports = ports + 1
    }
    if (ns.ls("home").includes("FTPCrack.exe")) {
      ns.ftpcrack(hostname[i])
      ports = ports + 1
    }
    if (ns.ls("home").includes("relaySMTP.exe")) {
      ns.relaysmtp(hostname[i])
      ports = ports + 1
    }
    if (ns.ls("home").includes("HTTPWorm.exe")) {
      ns.httpworm(hostname[i])
      ports = ports + 1
    }
    if (ns.ls("home").includes("SQLInject.exe")) {
      ns.sqlinject(hostname[i])
      ports = ports + 1
    }
    if (ns.hasRootAccess(hostname[i]) == false & ns.getServerNumPortsRequired(hostname[i]) <= ports) {
      ns.nuke(hostname[i])
      ns.print(hostname[i]+"已拿下")
    }
  }
}
