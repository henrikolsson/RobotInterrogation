using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RobotInterrogation.Models;
using RobotInterrogation.Services;

namespace RobotInterrogation.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        [HttpGet("[action]/{language}")]
        public string GetNextSessionID([FromServices] InterviewService service, string language)
        {
            return service.GetNewInterviewID(language);
        }

        [HttpGet("[action]")]
        public List<string> GetLanguages([FromServices] IOptions<GameConfigurations> configuration)
        {
            return new List<string>(configuration.Value.Data.Keys);
        }

        [HttpGet("[action]")]
        public IEnumerable<Packet> ListPackets([FromServices] IOptions<GameConfigurations> configuration)
        {
            // TODO: Is this used?
            return configuration.Value.Data["English"].Packets;
        }
    }
}
