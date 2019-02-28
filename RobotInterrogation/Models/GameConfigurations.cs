using System.Collections.Generic;

namespace RobotInterrogation.Models
{
    public class GameConfigurations
    {
        public int Duration { get; set; }
        public Dictionary<string, GameConfiguration> Data { get; set; }       
    }
}