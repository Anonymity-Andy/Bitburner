/** @param {NS} ns */
export async function main(ns) {
  // 打开日志
  ns.disableLog('ALL')
  ns.tail()
  await ns.sleep(1)
  ns.moveTail(900,450)
  ns.resizeTail(500, 350)

  // 获得所有server的名字，一共69个
  var hostname = ns.scan("home")
  var number = 0
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
  while (true){
    // 逐一骇入每一个服务器拿钱
    for(var i = 0; i < hostname.length; i++){
      if (ns.hasRootAccess(hostname[i]) & ns.getServerMoneyAvailable(hostname[i]) != 0 & ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(hostname[i])){
        await ns.grow(hostname[i])
        for (var i = 0; i < 10; i++){
          await ns.hack(hostname[i]) 
        }
        // 当警戒值高时降低警戒值
        while ((ns.getServerSecurityLevel(hostname[i]) - ns.getServerBaseSecurityLevel(hostname[i])) >= 0.5){
          await ns. weaken(hostname[i])
        }
        // 当有服务器没钱时提示
        if (ns.getServerMoneyAvailable(hostname[i]) == 0){
          ns.print(hostname[i] + "没钱了")
        }
      }
    }
  }
}
