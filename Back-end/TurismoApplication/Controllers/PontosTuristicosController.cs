using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TurismoApplication.Models;
using TurismoApplication.Models.Context;
using TurismoApplication.Services;

namespace TurismoApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontosTuristicosController : ControllerBase
    {
        private IPontosTuristicosService _pontoTuristicoService;

        public PontosTuristicosController(IPontosTuristicosService pontoTuristicoService)
        {
            _pontoTuristicoService = pontoTuristicoService;
        }

        [HttpGet]
        public async Task<ActionResult<IAsyncEnumerable<PontoTuristico>>> GetCLientesGetPontoTuristico()
        {
            try
            {
                var pontoTuristico = await _pontoTuristicoService.GetPontoTuristico();
                return Ok(pontoTuristico);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error ao obter os pontos turísticos");
            }
        }

        [HttpGet("PontoTuristicoPorName")]
        public async Task<ActionResult<IAsyncEnumerable<PontoTuristico>>> GetPontoTuristicoByName([FromQuery] string name)
        {
            try
            {
                var pontoTuristico = await _pontoTuristicoService.GetPontoTuristicoByName(name);
                if (pontoTuristico.Count() == 0)
                    return NotFound($"Não Existem clientes com o critério {name}");
                return Ok(pontoTuristico);
            }
            catch
            {
                return BadRequest("Request invalido");
            }
        }

        [HttpGet("skip/{skip}/take/{take}")]
        public async Task<IActionResult> GetAsync (
                [FromServices] AppDbContext context,
                int skip = 0,
                int take = 2)
        {
            var totalCount = await context.PontosTuristicos.CountAsync();
            var pontosturisticos = await context.PontosTuristicos
                .AsNoTracking()
                .Skip(skip)
                .Take(take)
                .ToListAsync();
            return Ok(new {
                totalCount,
                dados = pontosturisticos
            });
        }

        [HttpGet("{id:int}", Name = "GetPontoTuristico")]
        public async Task<ActionResult<IAsyncEnumerable<PontoTuristico>>> GetPontoTuristico(int id)
        {
            try
            {
                var pontoTuristico = await _pontoTuristicoService.GetPontoTuristico(id);
                if (pontoTuristico == null)
                    return NotFound($"Não Existem ponto turístico com o id {id}");
                return Ok(pontoTuristico);
            }
            catch
            {
                return BadRequest("Request invalido");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(PontoTuristico pontoTuristico)
        {
            try
            {
                await _pontoTuristicoService.CreatePontoTuristico(pontoTuristico);
                return CreatedAtRoute(nameof(GetPontoTuristico), new { id = pontoTuristico.Id }, pontoTuristico);
            }
            catch
            {
                return BadRequest("Request invalido");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, [FromBody] PontoTuristico pontoTuristico)
        {
            try
            {
                if (pontoTuristico.Id == id)
                {
                    await _pontoTuristicoService.UpdatePontoTuristico(pontoTuristico);
                    return NoContent();
                }
                else
                {
                    return BadRequest("Dados invalidos");
                }
            }
            catch
            {
                return BadRequest("Request invalido");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var pontoTuristico = await _pontoTuristicoService.GetPontoTuristico(id);
                if (pontoTuristico != null)
                {
                    await _pontoTuristicoService.DeletePontoTuristico(pontoTuristico);
                    return Ok($"O Ponto turístico de id={id} foi excluido com sucesso!!!");
                }

                else
                {
                    return NotFound($"Ponto turístico com id={id} não foi encontrado no nosso banco de dados");
                }
            }
            catch
            {
                return BadRequest("Request invalido");
            }
        }


    }
}

