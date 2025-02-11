module.exports = class System {
  /**
   * Get memory info
   *
   * @returns {NodeJS.MemoryUsage}
   */
  static getMemoryUsage() {
    return `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`
  }

  static processStartTime() {
    return new Date(Date.now() - process.uptime() * 1000)
  }
}
