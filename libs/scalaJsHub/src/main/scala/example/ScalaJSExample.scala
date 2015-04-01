package example
import scala.scalajs.js.annotation.JSExport
import org.scalajs.dom
import org.scalajs.dom.html
/* 
 * Credit: http://lihaoyi.github.io/hands-on-scala-js/
 */

@JSExport
object ScalaJSExample {
    @JSExport
    def main(canvas: html.Canvas): Unit = {
        /*setup*/
       val renderer = canvas.getContext("2d")
           .asInstanceOf[dom.CanvasRenderingContext2D]

       canvas.width = canvas.parentElement.clientWidth
       canvas.height = canvas.parentElement.clientHeight

       renderer.fillStyle = "#f8f8f8"
       renderer.fillRect(0, 0, canvas.width, canvas.height)

       /*code*/
       renderer.fillStyle = "black"
       var down = false
       canvas.onmousedown =
           (e: dom.MouseEvent) => down = true

       canvas.onmouseup =
           (e: dom.MouseEvent) => down = false

       canvas.onmousemove = {
           (e: dom.MouseEvent) =>
               val rect =
                   canvas.getBoundingClientRect()
               if (down) renderer.fillRect(
                   e.clientX - rect.left,
                   e.clientY - rect.top,
                   10, 10
               )
       }
    }
}
